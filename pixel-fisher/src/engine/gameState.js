export const PHASE = {
  MENU: 'menu',
  FISHING: 'fishing',
  CASTING: 'casting',
  WAITING: 'waiting',
  BITE: 'bite',
  REELING: 'reeling',
  CAUGHT: 'caught',
  LOST: 'lost',
  SHOP: 'shop',
  INVENTORY: 'inventory',
  ENCYCLOPEDIA: 'encyclopedia',
  ACHIEVEMENTS: 'achievements',
  MAP: 'map',
  SETTINGS: 'settings',
  COMPANION: 'companion',
};

const SAVE_KEY = 'pixel_fisher_save';

export function xpForLevel(level) {
  return Math.floor(100 * Math.pow(1.3, level - 1));
}

export function addXp(state, amount) {
  let xp = state.xp + amount;
  let level = state.level;
  let needed = xpForLevel(level);
  while (xp >= needed) {
    xp -= needed;
    level++;
    needed = xpForLevel(level);
  }
  return { ...state, xp, level };
}

export function canAfford(state, cost) {
  return state.gold >= cost;
}

export function getBaitCount(state, baitId) {
  return state.baitInventory[baitId] || 0;
}

export function createInitialState() {
  return {
    // Player
    level: 1,
    xp: 0,
    gold: 50,
    currentLocation: 'lake',
    currentRod: 'bamboo',
    currentBait: 'earthworm',
    currentAccessory: null,
    ownedRods: ['bamboo'],
    ownedAccessories: [],
    baitInventory: { earthworm: 20 },

    // Fish inventory
    caughtFish: [],

    // Encyclopedia
    discoveredSpecies: {},

    // Fishing state
    phase: PHASE.MENU,
    castPower: 0,
    castDirection: 1,
    waitTimer: 0,
    biteTimer: 0,
    currentFishOnHook: null,

    // Time & weather
    timeOfDay: 0.5,
    weather: 'sunny',
    daysPassed: 0,

    // Stats
    stats: {
      totalCaught: 0,
      totalLost: 0,
      totalGoldEarned: 0,
      biggestSize: 0,
      biggestWeight: 0,
      speciesDiscovered: 0,
      stormCatches: 0,
      nightCatches: 0,
      perfectReels: 0,
      bestStreak: 0,
      currentStreak: 0,
      rarityCount: { common: 0, uncommon: 0, rare: 0, epic: 0, legendary: 0 },
      level: 1,
    },

    // Achievements
    unlockedAchievements: [],

    // Notifications
    notifications: [],

    // MiMo
    mimoApiKey: '',
    mimoEnabled: false,

    // UI
    returnPhase: PHASE.FISHING,
    lastAutoSave: Date.now(),
  };
}

export function saveGame(state) {
  const toSave = { ...state, phase: PHASE.MENU, notifications: [] };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
    return true;
  } catch {
    return false;
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...createInitialState(), ...parsed, phase: PHASE.MENU, notifications: [] };
  } catch {
    return null;
  }
}

export function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}
