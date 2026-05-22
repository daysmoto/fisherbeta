import { useState, useEffect, useCallback, useRef } from 'react';
import { PHASE, createInitialState, loadGame, saveGame, deleteSave, addXp, getBaitCount, xpForLevel } from './engine/gameState';
import { getAvailableFish, rollForFish, generateFishInstance } from './engine/fishData';
import { getRodById, getAccessoryById, RODS, BAITS, ACCESSORIES } from './engine/equipmentData';
import { checkAchievements } from './engine/achievementData';

import FishingMenu from './components/FishingMenu';
import FishingCanvas from './components/FishingCanvas';
import FishingHUD from './components/FishingHUD';
import ReelMiniGame from './components/ReelMiniGame';
import FishingCatchModal from './components/FishingCatchModal';
import FishingShop from './components/FishingShop';
import FishingInventory from './components/FishingInventory';
import FishingEncyclopedia from './components/FishingEncyclopedia';
import FishingAchievements from './components/FishingAchievements';
import FishingMap from './components/FishingMap';
import FishingSettings from './components/FishingSettings';
import MiMoCompanion from './components/MiMoCompanion';

const CANVAS_W = 900;
const CANVAS_H = 520;

export default function App() {
  const [state, setState] = useState(createInitialState);
  const castIntervalRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Game loop: time progression, wait timers, bite detection
  useEffect(() => {
    if (state.phase !== PHASE.WAITING && state.phase !== PHASE.FISHING) return;

    gameLoopRef.current = setInterval(() => {
      setState(prev => {
        let next = { ...prev };

        // Time progression (~28 min full day cycle)
        next.timeOfDay = (prev.timeOfDay + 0.0002) % 1;

        // Weather changes
        if (Math.random() < 0.001) {
          const weathers = ['sunny', 'cloudy', 'rainy', 'stormy'];
          next.weather = weathers[Math.floor(Math.random() * weathers.length)];
        }

        // Day counter
        if (prev.timeOfDay > 0.99 && next.timeOfDay < 0.01) {
          next.daysPassed = prev.daysPassed + 1;
        }

        // Auto-save every 30 seconds
        if (Date.now() - prev.lastAutoSave > 30000) {
          saveGame(next);
          next.lastAutoSave = Date.now();
        }

        // Waiting phase: countdown to bite
        if (prev.phase === PHASE.WAITING) {
          next.waitTimer = prev.waitTimer - 0.1;
          if (next.waitTimer <= 0) {
            const available = getAvailableFish(prev.currentLocation, prev.timeOfDay, prev.weather);
            const fish = rollForFish(available, prev.currentBait);
            if (fish) {
              next.phase = PHASE.BITE;
              next.currentFishOnHook = fish;
              next.biteTimer = 3;
            } else {
              next.waitTimer = 3 + Math.random() * 5;
            }
          }
        }

        // Bite phase: countdown to miss
        if (prev.phase === PHASE.BITE) {
          next.biteTimer = prev.biteTimer - 0.1;
          if (next.biteTimer <= 0) {
            next.phase = PHASE.FISHING;
            next.currentFishOnHook = null;
            next.stats = { ...prev.stats, totalLost: prev.stats.totalLost + 1, currentStreak: 0 };
          }
        }

        return next;
      });
    }, 100);

    return () => clearInterval(gameLoopRef.current);
  }, [state.phase]);

  // Notification auto-clear
  useEffect(() => {
    if (state.notifications.length === 0) return;
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, notifications: prev.notifications.slice(1) }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.notifications]);

  const addNotification = useCallback((msg) => {
    setState(prev => ({ ...prev, notifications: [...prev.notifications, msg] }));
  }, []);

  const startNewGame = useCallback(() => {
    const fresh = createInitialState();
    fresh.phase = PHASE.FISHING;
    setState(fresh);
  }, []);

  const continueGame = useCallback(() => {
    const saved = loadGame();
    if (saved) {
      saved.phase = PHASE.FISHING;
      setState(saved);
    }
  }, []);

  const startCast = useCallback(() => {
    setState(prev => ({ ...prev, phase: PHASE.CASTING, castPower: 0, castDirection: 1 }));
    castIntervalRef.current = setInterval(() => {
      setState(prev => {
        let power = prev.castPower + prev.castDirection * 0.03;
        let dir = prev.castDirection;
        if (power >= 1) { power = 1; dir = -1; }
        if (power <= 0) { power = 0; dir = 1; }
        return { ...prev, castPower: power, castDirection: dir };
      });
    }, 30);
  }, []);

  const releaseCast = useCallback(() => {
    clearInterval(castIntervalRef.current);
    setState(prev => {
      const acc = prev.currentAccessory ? getAccessoryById(prev.currentAccessory) : null;
      const biteSpeed = acc?.effect === 'bite_speed' ? acc.value : 1;
      const waitTime = (3 + Math.random() * 7) * biteSpeed;

      // Consume bait
      const count = getBaitCount(prev, prev.currentBait);
      let newBaitInv = { ...prev.baitInventory };
      if (count > 0) {
        newBaitInv[prev.currentBait] = count - 1;
        if (newBaitInv[prev.currentBait] <= 0) delete newBaitInv[prev.currentBait];
      }

      return {
        ...prev,
        phase: PHASE.WAITING,
        waitTimer: waitTime,
        baitInventory: newBaitInv,
      };
    });
  }, []);

  const hookFish = useCallback(() => {
    setState(prev => {
      if (prev.phase !== PHASE.BITE || !prev.currentFishOnHook) return prev;
      return { ...prev, phase: PHASE.REELING };
    });
  }, []);

  const onReelComplete = useCallback((success, accuracy) => {
    setState(prev => {
      if (!prev.currentFishOnHook) return { ...prev, phase: PHASE.FISHING };

      if (success) {
        const fish = generateFishInstance(prev.currentFishOnHook);
        const isNight = prev.timeOfDay < 0.25 || prev.timeOfDay > 0.75;
        const newStreak = prev.stats.currentStreak + 1;

        // Update discovered species
        const disc = { ...prev.discoveredSpecies };
        if (!disc[fish.id]) {
          disc[fish.id] = { count: 1, bestSize: fish.instanceSize, bestWeight: fish.instanceWeight };
        } else {
          disc[fish.id] = {
            count: disc[fish.id].count + 1,
            bestSize: Math.max(disc[fish.id].bestSize, fish.instanceSize),
            bestWeight: Math.max(disc[fish.id].bestWeight, fish.instanceWeight),
          };
        }

        // XP based on rarity and difficulty
        const xpGain = 10 + (fish.rarity.stars * 8) + (fish.difficulty * 3);
        const playerAfterXp = addXp(prev, xpGain);

        const newStats = {
          ...prev.stats,
          totalCaught: prev.stats.totalCaught + 1,
          totalGoldEarned: prev.stats.totalGoldEarned,
          biggestSize: Math.max(prev.stats.biggestSize, fish.instanceSize),
          biggestWeight: Math.max(prev.stats.biggestWeight, fish.instanceWeight),
          speciesDiscovered: Object.keys(disc).length,
          stormCatches: prev.stats.stormCatches + (prev.weather === 'stormy' ? 1 : 0),
          nightCatches: prev.stats.nightCatches + (isNight ? 1 : 0),
          perfectReels: prev.stats.perfectReels + (accuracy >= 95 ? 1 : 0),
          currentStreak: newStreak,
          bestStreak: Math.max(prev.stats.bestStreak, newStreak),
          rarityCount: {
            ...prev.stats.rarityCount,
            [fish.rarity.id]: (prev.stats.rarityCount[fish.rarity.id] || 0) + 1,
          },
          level: playerAfterXp.level,
        };

        // Check achievements
        const newAchievements = checkAchievements(newStats, prev.unlockedAchievements);
        const achievementIds = [...prev.unlockedAchievements, ...newAchievements.map(a => a.id)];

        const notifications = [];
        if (!prev.discoveredSpecies[fish.id]) {
          notifications.push(`📖 New species: ${fish.name}!`);
        }
        for (const a of newAchievements) {
          notifications.push(`🏆 Achievement: ${a.name}!`);
        }
        if (playerAfterXp.level > prev.level) {
          notifications.push(`⭐ Level up! Now Lv.${playerAfterXp.level}`);
        }

        return {
          ...prev,
          phase: PHASE.CAUGHT,
          currentFishOnHook: fish,
          level: playerAfterXp.level,
          xp: playerAfterXp.xp,
          discoveredSpecies: disc,
          stats: newStats,
          unlockedAchievements: achievementIds,
          notifications: [...prev.notifications, ...notifications],
        };
      } else {
        return {
          ...prev,
          phase: PHASE.LOST,
          stats: { ...prev.stats, totalLost: prev.stats.totalLost + 1, currentStreak: 0 },
        };
      }
    });
  }, []);

  const keepFish = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: PHASE.FISHING,
      caughtFish: [...prev.caughtFish, prev.currentFishOnHook],
      currentFishOnHook: null,
    }));
  }, []);

  const sellFish = useCallback(() => {
    setState(prev => {
      const price = prev.currentFishOnHook?.instancePrice || 0;
      return {
        ...prev,
        phase: PHASE.FISHING,
        gold: prev.gold + price,
        stats: { ...prev.stats, totalGoldEarned: prev.stats.totalGoldEarned + price },
        currentFishOnHook: null,
      };
    });
  }, []);

  const sellInventoryFish = useCallback((index) => {
    setState(prev => {
      const fish = prev.caughtFish[index];
      if (!fish) return prev;
      const newFish = [...prev.caughtFish];
      newFish.splice(index, 1);
      return {
        ...prev,
        gold: prev.gold + fish.instancePrice,
        stats: { ...prev.stats, totalGoldEarned: prev.stats.totalGoldEarned + fish.instancePrice },
        caughtFish: newFish,
      };
    });
  }, []);

  const sellAllFish = useCallback(() => {
    setState(prev => {
      const total = prev.caughtFish.reduce((s, f) => s + f.instancePrice, 0);
      return {
        ...prev,
        gold: prev.gold + total,
        stats: { ...prev.stats, totalGoldEarned: prev.stats.totalGoldEarned + total },
        caughtFish: [],
      };
    });
  }, []);

  const handleBuy = useCallback((type, itemId, quantity) => {
    setState(prev => {
      if (type === 'rod') {
        const rod = RODS.find(r => r.id === itemId);
        if (!rod || prev.gold < rod.price || prev.ownedRods.includes(rod.id)) return prev;
        return { ...prev, gold: prev.gold - rod.price, ownedRods: [...prev.ownedRods, rod.id], currentRod: rod.id };
      }
      if (type === 'equip_rod') {
        return { ...prev, currentRod: itemId };
      }
      if (type === 'bait') {
        const bait = BAITS.find(b => b.id === itemId);
        const qty = quantity || 5;
        if (!bait || prev.gold < bait.price * qty) return prev;
        return {
          ...prev,
          gold: prev.gold - bait.price * qty,
          baitInventory: { ...prev.baitInventory, [bait.id]: (prev.baitInventory[bait.id] || 0) + qty },
        };
      }
      if (type === 'use_bait') {
        return { ...prev, currentBait: itemId };
      }
      if (type === 'accessory') {
        const acc = ACCESSORIES.find(a => a.id === itemId);
        if (!acc || prev.gold < acc.price || prev.ownedAccessories.includes(acc.id)) return prev;
        return { ...prev, gold: prev.gold - acc.price, ownedAccessories: [...prev.ownedAccessories, acc.id], currentAccessory: acc.id };
      }
      if (type === 'equip_acc') {
        return { ...prev, currentAccessory: itemId };
      }
      return prev;
    });
  }, []);

  const changeLocation = useCallback((locId) => {
    setState(prev => ({ ...prev, currentLocation: locId, phase: PHASE.FISHING }));
    addNotification(`🗺️ Traveled to new location!`);
  }, [addNotification]);

  const updateMiMo = useCallback((apiKey) => {
    setState(prev => ({
      ...prev,
      mimoApiKey: apiKey,
      mimoEnabled: apiKey.length > 0,
    }));
    addNotification(apiKey ? '🤖 MiMo AI Companion enabled!' : '🤖 MiMo AI Companion disabled');
  }, [addNotification]);

  const handleDeleteSave = useCallback(() => {
    deleteSave();
    setState(createInitialState());
    addNotification('🗑️ Save data deleted');
  }, [addNotification]);

  const setPhase = useCallback((phase) => {
    setState(prev => ({ ...prev, returnPhase: prev.phase, phase }));
  }, []);

  const closeModal = useCallback(() => {
    setState(prev => {
      const back = [PHASE.FISHING, PHASE.WAITING, PHASE.CASTING, PHASE.BITE].includes(prev.returnPhase)
        ? prev.returnPhase : PHASE.FISHING;
      return { ...prev, phase: back };
    });
  }, []);

  const handleGameClick = useCallback(() => {
    if (state.phase === PHASE.FISHING) startCast();
    else if (state.phase === PHASE.CASTING) releaseCast();
    else if (state.phase === PHASE.BITE) hookFish();
  }, [state.phase, startCast, releaseCast, hookFish]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' && [PHASE.FISHING, PHASE.CASTING, PHASE.BITE].includes(state.phase)) {
        e.preventDefault();
        handleGameClick();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state.phase, handleGameClick]);

  // ===== RENDER =====
  if (state.phase === PHASE.MENU) {
    return (
      <FishingMenu
        onStart={startNewGame}
        onContinue={continueGame}
        onSettings={() => setPhase(PHASE.SETTINGS)}
      />
    );
  }

  const rod = getRodById(state.currentRod);
  const acc = state.currentAccessory ? getAccessoryById(state.currentAccessory) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0e1a30 50%, #1a3050 100%)' }}>

      {/* Beta label */}
      <div className="absolute top-3 right-3 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-xs text-red-300 z-30">
        BETA 0.0.1
      </div>

      {/* MiMo branding */}
      <div className="absolute top-3 left-3 z-30">
        <a href="https://100t.xiaomimimo.com/" target="_blank" rel="noopener noreferrer"
          className="text-xs text-text-dim hover:text-gold transition-colors">
          {'🎮'} MiMo Orbit 100T
        </a>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold gold-text mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
        {'🎣'} Pixel Fisher
      </h1>

      {/* Main game area - desktop layout */}
      <div className="flex gap-4 items-start max-w-[1200px] w-full justify-center">
        {/* Canvas */}
        <div className="relative flex-shrink-0" onClick={handleGameClick} style={{ cursor: 'pointer' }}>
          <FishingCanvas state={state} canvasWidth={CANVAS_W} canvasHeight={CANVAS_H} />

          {/* Action hint */}
          {state.phase === PHASE.FISHING && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-lg text-sm text-gold-light animate-pulse">
              Click or press SPACE to cast
            </div>
          )}

          {/* Reel mini-game */}
          {state.phase === PHASE.REELING && state.currentFishOnHook && (
            <ReelMiniGame
              fish={state.currentFishOnHook}
              rodPower={rod?.power}
              rodControl={rod?.control}
              accessoryEffect={acc?.effect}
              onComplete={onReelComplete}
            />
          )}

          {/* Catch / Lost modal */}
          {state.phase === PHASE.CAUGHT && state.currentFishOnHook && (
            <FishingCatchModal fish={state.currentFishOnHook} caught={true} onKeep={keepFish} onSell={sellFish} />
          )}
          {state.phase === PHASE.LOST && (
            <FishingCatchModal caught={false} onDismiss={() => setState(prev => ({ ...prev, phase: PHASE.FISHING, currentFishOnHook: null }))} />
          )}

          {/* Modal overlays */}
          {state.phase === PHASE.SHOP && <FishingShop state={state} onBuy={handleBuy} onClose={closeModal} />}
          {state.phase === PHASE.INVENTORY && <FishingInventory state={state} onSellFish={sellInventoryFish} onSellAll={sellAllFish} onClose={closeModal} />}
          {state.phase === PHASE.ENCYCLOPEDIA && <FishingEncyclopedia state={state} onClose={closeModal} />}
          {state.phase === PHASE.ACHIEVEMENTS && <FishingAchievements state={state} onClose={closeModal} />}
          {state.phase === PHASE.MAP && <FishingMap state={state} onChangeLocation={changeLocation} onClose={closeModal} />}
          {state.phase === PHASE.SETTINGS && <FishingSettings state={state} onUpdateMiMo={updateMiMo} onDeleteSave={handleDeleteSave} onClose={() => setState(prev => ({ ...prev, phase: prev.returnPhase || PHASE.FISHING }))} />}
          {state.phase === PHASE.COMPANION && <MiMoCompanion state={state} onClose={closeModal} />}
        </div>

        {/* HUD sidebar */}
        <FishingHUD
          state={state}
          onShop={() => setPhase(PHASE.SHOP)}
          onInventory={() => setPhase(PHASE.INVENTORY)}
          onEncyclopedia={() => setPhase(PHASE.ENCYCLOPEDIA)}
          onAchievements={() => setPhase(PHASE.ACHIEVEMENTS)}
          onMap={() => setPhase(PHASE.MAP)}
          onSettings={() => setPhase(PHASE.SETTINGS)}
          onCompanion={() => setPhase(PHASE.COMPANION)}
        />
      </div>

      {/* Notifications */}
      <div className="fixed top-16 right-4 z-50 space-y-2">
        {state.notifications.map((msg, i) => (
          <div key={i} className="px-4 py-2 parchment rounded-lg text-sm gold-text animate-float border border-gold/30 gold-glow">
            {msg}
          </div>
        ))}
      </div>

      {/* Bait status */}
      <div className="mt-3 text-xs text-text-dim text-center">
        Bait: {state.currentBait} ({getBaitCount(state, state.currentBait)} left) | Press SPACE or click canvas to fish
      </div>
    </div>
  );
}
