import { xpForLevel } from '../engine/gameState';
import { getLocationById } from '../engine/locationData';
import { getRodById } from '../engine/equipmentData';

export default function FishingHUD({ state, onShop, onInventory, onEncyclopedia, onAchievements, onMap, onSettings, onCompanion }) {
  const needed = xpForLevel(state.level);
  const xpPct = Math.min(100, (state.xp / needed) * 100);
  const loc = getLocationById(state.currentLocation);
  const rod = getRodById(state.currentRod);

  const isNight = state.timeOfDay < 0.25 || state.timeOfDay > 0.75;
  const timeIcon = isNight ? '🌙' : '☀️';
  const weatherIcons = { sunny: '☀️', cloudy: '☁️', rainy: '🌧️', stormy: '⛈️' };

  return (
    <div className="flex flex-col gap-2 p-3 parchment rounded-lg text-sm min-w-[220px]">
      {/* Level & XP */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="gold-text font-bold">Lv.{state.level}</span>
          <span className="text-text-dim">{state.xp}/{needed} XP</span>
        </div>
        <div className="h-2 bg-black/30 rounded overflow-hidden">
          <div className="h-full xp-bar rounded transition-all" style={{ width: `${xpPct}%` }} />
        </div>
      </div>

      {/* Gold */}
      <div className="flex items-center gap-2">
        <span>🪙</span>
        <span className="gold-text font-bold">{state.gold}</span>
      </div>

      {/* Location & conditions */}
      <div className="text-xs text-text-dim space-y-1">
        <div>{loc?.emoji} {loc?.name}</div>
        <div>{timeIcon} {weatherIcons[state.weather]} Day {state.daysPassed + 1}</div>
        <div>🎣 {rod?.name}</div>
      </div>

      {/* Stats */}
      <div className="text-xs text-text-dim border-t border-border pt-2 mt-1">
        <div>Caught: {state.stats.totalCaught} | Streak: {state.stats.currentStreak}</div>
        <div>Species: {state.stats.speciesDiscovered}/{59}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-1.5 mt-2">
        <button onClick={onShop} className="px-2 py-1.5 bg-gold/20 hover:bg-gold/30 rounded text-xs border border-gold/20">🛒 Shop</button>
        <button onClick={onInventory} className="px-2 py-1.5 bg-gold/20 hover:bg-gold/30 rounded text-xs border border-gold/20">🎒 Bag</button>
        <button onClick={onEncyclopedia} className="px-2 py-1.5 bg-gold/20 hover:bg-gold/30 rounded text-xs border border-gold/20">📖 Fish</button>
        <button onClick={onAchievements} className="px-2 py-1.5 bg-gold/20 hover:bg-gold/30 rounded text-xs border border-gold/20">🏆 Feats</button>
        <button onClick={onMap} className="px-2 py-1.5 bg-gold/20 hover:bg-gold/30 rounded text-xs border border-gold/20">🗺️ Map</button>
        <button onClick={onSettings} className="px-2 py-1.5 bg-gold/20 hover:bg-gold/30 rounded text-xs border border-gold/20">⚙️ Set</button>
        {state.mimoEnabled && (
          <button onClick={onCompanion} className="col-span-2 px-2 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded text-xs border border-blue-500/20">🤖 AI Companion</button>
        )}
      </div>
    </div>
  );
}
