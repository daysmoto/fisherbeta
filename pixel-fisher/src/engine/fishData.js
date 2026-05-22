// Fish rarity definitions
export const RARITY = {
  COMMON: { id: 'common', label: 'Common', color: '#a0a0a0', stars: 1, priceMultiplier: 1 },
  UNCOMMON: { id: 'uncommon', label: 'Uncommon', color: '#40b040', stars: 2, priceMultiplier: 1.5 },
  RARE: { id: 'rare', label: 'Rare', color: '#4080d0', stars: 3, priceMultiplier: 3 },
  EPIC: { id: 'epic', label: 'Epic', color: '#a040c0', stars: 4, priceMultiplier: 6 },
  LEGENDARY: { id: 'legendary', label: 'Legendary', color: '#e8c830', stars: 5, priceMultiplier: 15 },
};

// Difficulty scale 1-10: affects reel mini-game aggressiveness
// 1-2 = Easy (slow, predictable), 3-4 = Medium, 5-6 = Hard, 7-8 = Very Hard, 9-10 = Extreme
export const FISH = [
  // ===== PEACEFUL LAKE (15 species) =====
  { id: 'bluegill', name: 'Bluegill', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['lake'], minSize: 10, maxSize: 25, minWeight: 0.2, maxWeight: 1.5, basePrice: 8, difficulty: 1, preferredBait: ['earthworm', 'cricket'], timeOfDay: 'any', weather: 'any', description: 'A small, colorful panfish. Perfect for beginners.', colors: { body: '#4080d0', belly: '#a0d0f0', fin: '#3060a0' } },
  { id: 'perch', name: 'Yellow Perch', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['lake'], minSize: 15, maxSize: 35, minWeight: 0.3, maxWeight: 2.0, basePrice: 12, difficulty: 1, preferredBait: ['earthworm', 'minnow'], timeOfDay: 'any', weather: 'any', description: 'Striped yellow fish found in calm waters.', colors: { body: '#e8c830', belly: '#f0e880', fin: '#b89820' } },
  { id: 'sunfish', name: 'Sunfish', emoji: '\u{1F31E}', rarity: RARITY.COMMON, locations: ['lake'], minSize: 8, maxSize: 20, minWeight: 0.1, maxWeight: 0.8, basePrice: 6, difficulty: 1, preferredBait: ['earthworm'], timeOfDay: 'day', weather: 'sunny', description: 'Loves basking in shallow sunny waters.', colors: { body: '#e88030', belly: '#f0c060', fin: '#c06020' } },
  { id: 'crappie', name: 'Crappie', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['lake'], minSize: 15, maxSize: 30, minWeight: 0.3, maxWeight: 1.8, basePrice: 10, difficulty: 2, preferredBait: ['minnow', 'cricket'], timeOfDay: 'any', weather: 'any', description: 'A popular panfish with speckled markings.', colors: { body: '#707070', belly: '#b0b0b0', fin: '#505050' } },
  { id: 'catfish', name: 'Channel Catfish', emoji: '\u{1F408}', rarity: RARITY.UNCOMMON, locations: ['lake', 'river'], minSize: 30, maxSize: 80, minWeight: 2, maxWeight: 15, basePrice: 25, difficulty: 3, preferredBait: ['earthworm', 'shrimp'], timeOfDay: 'night', weather: 'any', description: 'Nocturnal bottom feeder with long whiskers.', colors: { body: '#6a5a4a', belly: '#a09080', fin: '#504030' } },
  { id: 'bass', name: 'Largemouth Bass', emoji: '\u{1F3C6}', rarity: RARITY.UNCOMMON, locations: ['lake'], minSize: 25, maxSize: 60, minWeight: 1, maxWeight: 8, basePrice: 30, difficulty: 4, preferredBait: ['minnow', 'special_lure'], timeOfDay: 'any', weather: 'any', description: 'The king of freshwater sport fishing.', colors: { body: '#408040', belly: '#c0e0b0', fin: '#306030' } },
  { id: 'carp', name: 'Common Carp', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['lake', 'river'], minSize: 30, maxSize: 90, minWeight: 2, maxWeight: 20, basePrice: 15, difficulty: 3, preferredBait: ['earthworm', 'cricket'], timeOfDay: 'any', weather: 'any', description: 'Hardy fish that puts up a strong fight.', colors: { body: '#b08830', belly: '#d0b870', fin: '#907020' } },
  { id: 'walleye', name: 'Walleye', emoji: '\u{1F440}', rarity: RARITY.RARE, locations: ['lake'], minSize: 30, maxSize: 70, minWeight: 1.5, maxWeight: 10, basePrice: 50, difficulty: 5, preferredBait: ['minnow', 'special_lure'], timeOfDay: 'night', weather: 'cloudy', description: 'Prized game fish with reflective eyes.', colors: { body: '#8a8a50', belly: '#c0c090', fin: '#6a6a30' } },
  { id: 'pike', name: 'Northern Pike', emoji: '\u{2694}\u{FE0F}', rarity: RARITY.RARE, locations: ['lake', 'river'], minSize: 40, maxSize: 120, minWeight: 3, maxWeight: 25, basePrice: 65, difficulty: 6, preferredBait: ['minnow', 'special_lure'], timeOfDay: 'any', weather: 'any', description: 'Aggressive predator with razor-sharp teeth.', colors: { body: '#406040', belly: '#a0c090', fin: '#305030' } },
  { id: 'muskie', name: 'Muskellunge', emoji: '\u{1F432}', rarity: RARITY.EPIC, locations: ['lake'], minSize: 60, maxSize: 150, minWeight: 5, maxWeight: 35, basePrice: 150, difficulty: 8, preferredBait: ['special_lure', 'golden_bait'], timeOfDay: 'any', weather: 'cloudy', description: 'The fish of 10,000 casts. Elusive apex predator.', colors: { body: '#4a6a4a', belly: '#90b090', fin: '#3a5a3a' } },
  { id: 'golden_koi', name: 'Golden Koi', emoji: '\u{2728}', rarity: RARITY.EPIC, locations: ['lake'], minSize: 40, maxSize: 80, minWeight: 3, maxWeight: 12, basePrice: 200, difficulty: 7, preferredBait: ['golden_bait', 'magic_bait'], timeOfDay: 'day', weather: 'sunny', description: 'Shimmering golden scales. A symbol of prosperity.', colors: { body: '#d4a843', belly: '#f0d878', fin: '#b08020' } },
  { id: 'turtle_fish', name: 'Snapping Turtle', emoji: '\u{1F422}', rarity: RARITY.UNCOMMON, locations: ['lake'], minSize: 20, maxSize: 50, minWeight: 3, maxWeight: 15, basePrice: 20, difficulty: 4, preferredBait: ['earthworm', 'shrimp'], timeOfDay: 'day', weather: 'sunny', description: 'Not a fish, but it took the bait anyway!', colors: { body: '#506040', belly: '#90a070', fin: '#405030' } },
  { id: 'bullhead', name: 'Bullhead Catfish', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['lake'], minSize: 15, maxSize: 35, minWeight: 0.5, maxWeight: 3, basePrice: 10, difficulty: 2, preferredBait: ['earthworm'], timeOfDay: 'night', weather: 'any', description: 'Small catfish that feeds at night.', colors: { body: '#4a3a2a', belly: '#8a7a6a', fin: '#3a2a1a' } },
  { id: 'lake_sturgeon', name: 'Lake Sturgeon', emoji: '\u{1F409}', rarity: RARITY.LEGENDARY, locations: ['lake'], minSize: 100, maxSize: 200, minWeight: 20, maxWeight: 100, basePrice: 500, difficulty: 9, preferredBait: ['golden_bait', 'magic_bait'], timeOfDay: 'any', weather: 'stormy', description: 'Ancient giant. Can live over 100 years.', colors: { body: '#505050', belly: '#909090', fin: '#383838' } },
  { id: 'rainbow_trout_lake', name: 'Rainbow Trout', emoji: '\u{1F308}', rarity: RARITY.UNCOMMON, locations: ['lake', 'river'], minSize: 20, maxSize: 50, minWeight: 0.5, maxWeight: 5, basePrice: 22, difficulty: 3, preferredBait: ['cricket', 'minnow'], timeOfDay: 'any', weather: 'any', description: 'Beautiful trout with iridescent stripes.', colors: { body: '#60a060', belly: '#e0b0c0', fin: '#408040' } },

  // ===== MOUNTAIN RIVER (12 species) =====
  { id: 'brook_trout', name: 'Brook Trout', emoji: '\u{1F3D4}\u{FE0F}', rarity: RARITY.COMMON, locations: ['river'], minSize: 15, maxSize: 40, minWeight: 0.3, maxWeight: 3, basePrice: 15, difficulty: 2, preferredBait: ['cricket', 'minnow'], timeOfDay: 'any', weather: 'any', description: 'Cold-water trout with vivid spots.', colors: { body: '#406050', belly: '#e0a080', fin: '#305040' } },
  { id: 'brown_trout', name: 'Brown Trout', emoji: '\u{1F41F}', rarity: RARITY.UNCOMMON, locations: ['river'], minSize: 25, maxSize: 60, minWeight: 1, maxWeight: 8, basePrice: 28, difficulty: 4, preferredBait: ['minnow', 'special_lure'], timeOfDay: 'any', weather: 'cloudy', description: 'Wary and elusive. A true challenge.', colors: { body: '#8a7040', belly: '#d0b880', fin: '#6a5030' } },
  { id: 'salmon', name: 'Atlantic Salmon', emoji: '\u{1F41F}', rarity: RARITY.RARE, locations: ['river', 'ocean'], minSize: 40, maxSize: 100, minWeight: 3, maxWeight: 20, basePrice: 70, difficulty: 6, preferredBait: ['minnow', 'special_lure'], timeOfDay: 'any', weather: 'rainy', description: 'Powerful swimmer that leaps rapids.', colors: { body: '#a08080', belly: '#e0c0c0', fin: '#806060' } },
  { id: 'steelhead', name: 'Steelhead', emoji: '\u{26A1}', rarity: RARITY.RARE, locations: ['river'], minSize: 40, maxSize: 90, minWeight: 3, maxWeight: 18, basePrice: 60, difficulty: 7, preferredBait: ['special_lure', 'shrimp'], timeOfDay: 'any', weather: 'rainy', description: 'Lightning-fast sea-run rainbow trout.', colors: { body: '#708090', belly: '#c0d0e0', fin: '#506070' } },
  { id: 'grayling', name: 'Arctic Grayling', emoji: '\u{2744}\u{FE0F}', rarity: RARITY.UNCOMMON, locations: ['river'], minSize: 20, maxSize: 45, minWeight: 0.5, maxWeight: 3, basePrice: 25, difficulty: 3, preferredBait: ['cricket', 'earthworm'], timeOfDay: 'day', weather: 'any', description: 'Elegant fish with a large, sail-like dorsal fin.', colors: { body: '#7070a0', belly: '#b0b0d0', fin: '#8060b0' } },
  { id: 'river_eel', name: 'River Eel', emoji: '\u{1F40D}', rarity: RARITY.UNCOMMON, locations: ['river'], minSize: 40, maxSize: 100, minWeight: 1, maxWeight: 6, basePrice: 20, difficulty: 5, preferredBait: ['earthworm', 'shrimp'], timeOfDay: 'night', weather: 'any', description: 'Slippery and strong. Hard to hold onto.', colors: { body: '#404060', belly: '#808090', fin: '#303050' } },
  { id: 'smallmouth_bass', name: 'Smallmouth Bass', emoji: '\u{1F4AA}', rarity: RARITY.UNCOMMON, locations: ['river'], minSize: 20, maxSize: 50, minWeight: 0.8, maxWeight: 5, basePrice: 25, difficulty: 5, preferredBait: ['minnow', 'cricket'], timeOfDay: 'day', weather: 'any', description: 'Pound for pound, the hardest fighting freshwater fish.', colors: { body: '#706040', belly: '#b0a080', fin: '#504030' } },
  { id: 'chinook', name: 'Chinook Salmon', emoji: '\u{1F451}', rarity: RARITY.EPIC, locations: ['river'], minSize: 60, maxSize: 130, minWeight: 8, maxWeight: 40, basePrice: 130, difficulty: 8, preferredBait: ['special_lure', 'golden_bait'], timeOfDay: 'any', weather: 'rainy', description: 'The King Salmon. Massive and powerful.', colors: { body: '#608060', belly: '#c0d0c0', fin: '#406040' } },
  { id: 'chub', name: 'Creek Chub', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['river'], minSize: 10, maxSize: 25, minWeight: 0.1, maxWeight: 0.8, basePrice: 5, difficulty: 1, preferredBait: ['earthworm'], timeOfDay: 'any', weather: 'any', description: 'Small and easy to catch. Good practice.', colors: { body: '#808080', belly: '#c0c0c0', fin: '#606060' } },
  { id: 'river_spirit', name: 'River Spirit', emoji: '\u{1F47B}', rarity: RARITY.LEGENDARY, locations: ['river'], minSize: 80, maxSize: 160, minWeight: 15, maxWeight: 60, basePrice: 600, difficulty: 10, preferredBait: ['magic_bait'], timeOfDay: 'night', weather: 'stormy', description: 'Mythical translucent fish. Appears only in storms.', colors: { body: '#a0c0e0', belly: '#d0e0f0', fin: '#80a0c0' } },
  { id: 'dace', name: 'Common Dace', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['river'], minSize: 12, maxSize: 28, minWeight: 0.1, maxWeight: 0.6, basePrice: 7, difficulty: 1, preferredBait: ['earthworm', 'cricket'], timeOfDay: 'day', weather: 'any', description: 'Fast little silver fish of clear rivers.', colors: { body: '#b0b0b0', belly: '#e0e0e0', fin: '#909090' } },
  { id: 'white_sturgeon', name: 'White Sturgeon', emoji: '\u{1F4AA}', rarity: RARITY.EPIC, locations: ['river'], minSize: 100, maxSize: 250, minWeight: 30, maxWeight: 150, basePrice: 200, difficulty: 9, preferredBait: ['golden_bait', 'shrimp'], timeOfDay: 'any', weather: 'any', description: 'Enormous prehistoric fish. Test of endurance.', colors: { body: '#707070', belly: '#b0b0b0', fin: '#505050' } },

  // ===== DEEP OCEAN (12 species) =====
  { id: 'mackerel', name: 'Mackerel', emoji: '\u{1F30A}', rarity: RARITY.COMMON, locations: ['ocean'], minSize: 20, maxSize: 50, minWeight: 0.5, maxWeight: 3, basePrice: 12, difficulty: 2, preferredBait: ['shrimp', 'minnow'], timeOfDay: 'any', weather: 'any', description: 'Fast schooling fish with tiger stripes.', colors: { body: '#3070a0', belly: '#c0d8e8', fin: '#205080' } },
  { id: 'sea_bass', name: 'Sea Bass', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['ocean'], minSize: 25, maxSize: 60, minWeight: 1, maxWeight: 6, basePrice: 18, difficulty: 3, preferredBait: ['shrimp', 'minnow'], timeOfDay: 'any', weather: 'any', description: 'Reliable ocean catch with firm white flesh.', colors: { body: '#607080', belly: '#a0b0c0', fin: '#405060' } },
  { id: 'red_snapper', name: 'Red Snapper', emoji: '\u{1F534}', rarity: RARITY.UNCOMMON, locations: ['ocean'], minSize: 30, maxSize: 80, minWeight: 2, maxWeight: 15, basePrice: 40, difficulty: 4, preferredBait: ['shrimp', 'special_lure'], timeOfDay: 'day', weather: 'any', description: 'Vivid red reef fish. Highly prized.', colors: { body: '#d04040', belly: '#e09090', fin: '#b03030' } },
  { id: 'tuna', name: 'Bluefin Tuna', emoji: '\u{1F3CB}\u{FE0F}', rarity: RARITY.RARE, locations: ['ocean'], minSize: 60, maxSize: 200, minWeight: 15, maxWeight: 200, basePrice: 100, difficulty: 7, preferredBait: ['special_lure', 'minnow'], timeOfDay: 'day', weather: 'sunny', description: 'Powerful ocean sprinter. Incredibly strong.', colors: { body: '#203860', belly: '#c0c8d0', fin: '#182848' } },
  { id: 'swordfish', name: 'Swordfish', emoji: '\u{2694}\u{FE0F}', rarity: RARITY.RARE, locations: ['ocean'], minSize: 100, maxSize: 300, minWeight: 30, maxWeight: 200, basePrice: 120, difficulty: 8, preferredBait: ['special_lure', 'golden_bait'], timeOfDay: 'any', weather: 'any', description: 'Majestic predator with a long flat bill.', colors: { body: '#404858', belly: '#a0a8b0', fin: '#303840' } },
  { id: 'mahi_mahi', name: 'Mahi-Mahi', emoji: '\u{1F308}', rarity: RARITY.RARE, locations: ['ocean'], minSize: 50, maxSize: 140, minWeight: 5, maxWeight: 30, basePrice: 80, difficulty: 6, preferredBait: ['minnow', 'special_lure'], timeOfDay: 'day', weather: 'sunny', description: 'Dazzling colors that change when excited.', colors: { body: '#40b040', belly: '#e8e840', fin: '#3090d0' } },
  { id: 'barracuda', name: 'Barracuda', emoji: '\u{1F608}', rarity: RARITY.UNCOMMON, locations: ['ocean'], minSize: 40, maxSize: 120, minWeight: 3, maxWeight: 25, basePrice: 35, difficulty: 6, preferredBait: ['minnow', 'special_lure'], timeOfDay: 'any', weather: 'any', description: 'Fearsome predator with needle-like teeth.', colors: { body: '#808890', belly: '#c0c4c8', fin: '#606870' } },
  { id: 'marlin', name: 'Blue Marlin', emoji: '\u{1F3C6}', rarity: RARITY.EPIC, locations: ['ocean'], minSize: 200, maxSize: 450, minWeight: 80, maxWeight: 600, basePrice: 300, difficulty: 9, preferredBait: ['golden_bait', 'special_lure'], timeOfDay: 'day', weather: 'sunny', description: 'The ultimate big game fish. Legendary fighter.', colors: { body: '#2050a0', belly: '#b0c0d0', fin: '#103880' } },
  { id: 'octopus', name: 'Giant Octopus', emoji: '\u{1F419}', rarity: RARITY.EPIC, locations: ['ocean'], minSize: 60, maxSize: 150, minWeight: 10, maxWeight: 50, basePrice: 180, difficulty: 7, preferredBait: ['shrimp', 'golden_bait'], timeOfDay: 'night', weather: 'any', description: 'Intelligent creature with eight arms.', colors: { body: '#a04060', belly: '#d090a0', fin: '#803050' } },
  { id: 'whale_shark', name: 'Whale Shark', emoji: '\u{1F40B}', rarity: RARITY.LEGENDARY, locations: ['ocean'], minSize: 400, maxSize: 1200, minWeight: 500, maxWeight: 5000, basePrice: 1000, difficulty: 10, preferredBait: ['magic_bait'], timeOfDay: 'day', weather: 'sunny', description: 'Gentle giant of the ocean. Incredibly rare.', colors: { body: '#405060', belly: '#e0e8f0', fin: '#304050' } },
  { id: 'jellyfish', name: 'Moon Jellyfish', emoji: '\u{1FAB8}', rarity: RARITY.UNCOMMON, locations: ['ocean'], minSize: 15, maxSize: 40, minWeight: 0.2, maxWeight: 2, basePrice: 15, difficulty: 2, preferredBait: ['shrimp'], timeOfDay: 'night', weather: 'any', description: 'Translucent and ethereal. Handle with care.', colors: { body: '#a0b0d0', belly: '#d0e0f0', fin: '#8090b0' } },
  { id: 'flounder', name: 'Summer Flounder', emoji: '\u{1F41F}', rarity: RARITY.COMMON, locations: ['ocean'], minSize: 20, maxSize: 60, minWeight: 1, maxWeight: 8, basePrice: 14, difficulty: 2, preferredBait: ['shrimp', 'earthworm'], timeOfDay: 'any', weather: 'any', description: 'Flat bottom-dweller that blends with sand.', colors: { body: '#a09070', belly: '#e0d0c0', fin: '#807060' } },

  // ===== ENCHANTED POND (10 species) =====
  { id: 'fairy_fish', name: 'Fairy Fish', emoji: '\u{1F9DA}', rarity: RARITY.UNCOMMON, locations: ['enchanted'], minSize: 10, maxSize: 25, minWeight: 0.1, maxWeight: 0.5, basePrice: 35, difficulty: 3, preferredBait: ['magic_bait', 'golden_bait'], timeOfDay: 'night', weather: 'any', description: 'Tiny glowing fish that leaves sparkle trails.', colors: { body: '#e0a0e0', belly: '#f0d0f0', fin: '#c080c0' } },
  { id: 'moonfish', name: 'Moonfish', emoji: '\u{1F319}', rarity: RARITY.RARE, locations: ['enchanted'], minSize: 20, maxSize: 50, minWeight: 0.5, maxWeight: 4, basePrice: 60, difficulty: 5, preferredBait: ['magic_bait'], timeOfDay: 'night', weather: 'any', description: 'Glows silver under moonlight. Mysterious.', colors: { body: '#c0c8e0', belly: '#e8e8f8', fin: '#a0a8c0' } },
  { id: 'starfish_catch', name: 'Star Swimmer', emoji: '\u{2B50}', rarity: RARITY.RARE, locations: ['enchanted'], minSize: 15, maxSize: 35, minWeight: 0.3, maxWeight: 2, basePrice: 55, difficulty: 4, preferredBait: ['golden_bait', 'magic_bait'], timeOfDay: 'night', weather: 'any', description: 'Star-shaped fish that twinkles as it swims.', colors: { body: '#e8c830', belly: '#f0e080', fin: '#d0b020' } },
  { id: 'crystal_fish', name: 'Crystal Fish', emoji: '\u{1F48E}', rarity: RARITY.EPIC, locations: ['enchanted'], minSize: 25, maxSize: 55, minWeight: 1, maxWeight: 6, basePrice: 160, difficulty: 7, preferredBait: ['magic_bait'], timeOfDay: 'any', weather: 'any', description: 'Transparent body reveals a crystalline skeleton.', colors: { body: '#a0d0e0', belly: '#d0f0f8', fin: '#80b0c0' } },
  { id: 'phantom_pike', name: 'Phantom Pike', emoji: '\u{1F47B}', rarity: RARITY.EPIC, locations: ['enchanted'], minSize: 50, maxSize: 120, minWeight: 5, maxWeight: 25, basePrice: 180, difficulty: 8, preferredBait: ['magic_bait', 'golden_bait'], timeOfDay: 'night', weather: 'stormy', description: 'Phase-shifting predator. Now you see it...', colors: { body: '#606880', belly: '#a0a8b8', fin: '#404860' } },
  { id: 'phoenix_fish', name: 'Phoenix Fish', emoji: '\u{1F525}', rarity: RARITY.LEGENDARY, locations: ['enchanted'], minSize: 60, maxSize: 140, minWeight: 8, maxWeight: 35, basePrice: 800, difficulty: 10, preferredBait: ['magic_bait'], timeOfDay: 'any', weather: 'any', description: 'Wreathed in ethereal flames. Reborn from ashes.', colors: { body: '#e04040', belly: '#e8a040', fin: '#e8c830' } },
  { id: 'pixie_minnow', name: 'Pixie Minnow', emoji: '\u{2728}', rarity: RARITY.COMMON, locations: ['enchanted'], minSize: 5, maxSize: 12, minWeight: 0.05, maxWeight: 0.2, basePrice: 8, difficulty: 1, preferredBait: ['magic_bait', 'cricket'], timeOfDay: 'any', weather: 'any', description: 'Tiny enchanted fish. Moves in swarms.', colors: { body: '#90d090', belly: '#c0f0c0', fin: '#70b070' } },
  { id: 'shadow_carp', name: 'Shadow Carp', emoji: '\u{1F311}', rarity: RARITY.UNCOMMON, locations: ['enchanted'], minSize: 30, maxSize: 70, minWeight: 2, maxWeight: 12, basePrice: 30, difficulty: 4, preferredBait: ['earthworm', 'magic_bait'], timeOfDay: 'night', weather: 'any', description: 'Dark as midnight. Almost invisible in water.', colors: { body: '#202030', belly: '#404050', fin: '#101020' } },
  { id: 'unicorn_fish', name: 'Unicorn Fish', emoji: '\u{1F984}', rarity: RARITY.RARE, locations: ['enchanted'], minSize: 35, maxSize: 75, minWeight: 2, maxWeight: 10, basePrice: 75, difficulty: 6, preferredBait: ['golden_bait', 'magic_bait'], timeOfDay: 'day', weather: 'sunny', description: 'Has a single horn on its forehead. Majestic.', colors: { body: '#e0e0f0', belly: '#f0f0ff', fin: '#c0c0d0' } },
  { id: 'wish_fish', name: 'Wish Fish', emoji: '\u{1F320}', rarity: RARITY.LEGENDARY, locations: ['enchanted'], minSize: 40, maxSize: 80, minWeight: 3, maxWeight: 15, basePrice: 700, difficulty: 9, preferredBait: ['magic_bait'], timeOfDay: 'night', weather: 'any', description: 'Legend says catching one grants a wish.', colors: { body: '#f0d040', belly: '#f8e880', fin: '#d8b020' } },

  // ===== VOLCANIC HOTSPRING (10 species) =====
  { id: 'magma_fish', name: 'Magma Fish', emoji: '\u{1F30B}', rarity: RARITY.UNCOMMON, locations: ['volcanic'], minSize: 20, maxSize: 50, minWeight: 1, maxWeight: 5, basePrice: 35, difficulty: 4, preferredBait: ['special_lure', 'golden_bait'], timeOfDay: 'any', weather: 'any', description: 'Thrives in superheated water. Literally hot.', colors: { body: '#d04020', belly: '#e88040', fin: '#b03010' } },
  { id: 'obsidian_bass', name: 'Obsidian Bass', emoji: '\u{26AB}', rarity: RARITY.RARE, locations: ['volcanic'], minSize: 30, maxSize: 70, minWeight: 2, maxWeight: 12, basePrice: 65, difficulty: 6, preferredBait: ['special_lure', 'golden_bait'], timeOfDay: 'any', weather: 'any', description: 'Jet-black scales harder than stone.', colors: { body: '#1a1a2a', belly: '#3a3a4a', fin: '#0a0a1a' } },
  { id: 'sulfur_eel', name: 'Sulfur Eel', emoji: '\u{1F7E1}', rarity: RARITY.UNCOMMON, locations: ['volcanic'], minSize: 40, maxSize: 90, minWeight: 1.5, maxWeight: 7, basePrice: 30, difficulty: 5, preferredBait: ['shrimp', 'special_lure'], timeOfDay: 'any', weather: 'any', description: 'Yellow eel that smells of sulfur.', colors: { body: '#c0a020', belly: '#e0c840', fin: '#a08010' } },
  { id: 'fire_belly', name: 'Fire Belly Newt', emoji: '\u{1F525}', rarity: RARITY.COMMON, locations: ['volcanic'], minSize: 8, maxSize: 20, minWeight: 0.1, maxWeight: 0.5, basePrice: 12, difficulty: 2, preferredBait: ['earthworm', 'cricket'], timeOfDay: 'any', weather: 'any', description: 'Small amphibian with a bright orange belly.', colors: { body: '#404040', belly: '#e06020', fin: '#303030' } },
  { id: 'ash_catfish', name: 'Ash Catfish', emoji: '\u{1F32B}\u{FE0F}', rarity: RARITY.COMMON, locations: ['volcanic'], minSize: 25, maxSize: 60, minWeight: 1.5, maxWeight: 8, basePrice: 16, difficulty: 3, preferredBait: ['earthworm', 'shrimp'], timeOfDay: 'night', weather: 'any', description: 'Grey catfish adapted to volcanic waters.', colors: { body: '#707070', belly: '#a0a0a0', fin: '#505050' } },
  { id: 'ruby_trout', name: 'Ruby Trout', emoji: '\u{1F534}', rarity: RARITY.RARE, locations: ['volcanic'], minSize: 25, maxSize: 55, minWeight: 1, maxWeight: 6, basePrice: 55, difficulty: 5, preferredBait: ['golden_bait', 'special_lure'], timeOfDay: 'any', weather: 'any', description: 'Deep red trout found only in hot springs.', colors: { body: '#c03030', belly: '#e08080', fin: '#a02020' } },
  { id: 'dragon_fish', name: 'Dragon Fish', emoji: '\u{1F432}', rarity: RARITY.EPIC, locations: ['volcanic'], minSize: 60, maxSize: 150, minWeight: 8, maxWeight: 40, basePrice: 250, difficulty: 9, preferredBait: ['golden_bait', 'magic_bait'], timeOfDay: 'any', weather: 'stormy', description: 'Armored scales and fiery temperament.', colors: { body: '#802020', belly: '#c05030', fin: '#601010' } },
  { id: 'lava_leviathan', name: 'Lava Leviathan', emoji: '\u{1F30B}', rarity: RARITY.LEGENDARY, locations: ['volcanic'], minSize: 150, maxSize: 400, minWeight: 50, maxWeight: 300, basePrice: 1200, difficulty: 10, preferredBait: ['magic_bait'], timeOfDay: 'any', weather: 'stormy', description: 'Colossal beast from the volcanic depths.', colors: { body: '#901010', belly: '#d04020', fin: '#600808' } },
  { id: 'thermal_perch', name: 'Thermal Perch', emoji: '\u{1F321}\u{FE0F}', rarity: RARITY.COMMON, locations: ['volcanic'], minSize: 15, maxSize: 35, minWeight: 0.3, maxWeight: 2, basePrice: 11, difficulty: 2, preferredBait: ['earthworm', 'cricket'], timeOfDay: 'day', weather: 'any', description: 'Adapted to warm waters. Energetic swimmer.', colors: { body: '#d08040', belly: '#e0b080', fin: '#b06030' } },
  { id: 'ember_guppy', name: 'Ember Guppy', emoji: '\u{1F525}', rarity: RARITY.COMMON, locations: ['volcanic'], minSize: 5, maxSize: 12, minWeight: 0.05, maxWeight: 0.2, basePrice: 6, difficulty: 1, preferredBait: ['earthworm'], timeOfDay: 'any', weather: 'any', description: 'Tiny fish that glows like a hot ember.', colors: { body: '#e06020', belly: '#f0a060', fin: '#c04010' } },
];

export function getFishForLocation(locationId) {
  return FISH.filter(f => f.locations.includes(locationId));
}

export function getAvailableFish(locationId, timeOfDay, weather) {
  const locationFish = getFishForLocation(locationId);
  return locationFish.filter(fish => {
    if (fish.timeOfDay !== 'any') {
      const isNight = timeOfDay < 0.25 || timeOfDay > 0.75;
      const isDay = timeOfDay >= 0.3 && timeOfDay <= 0.7;
      if (fish.timeOfDay === 'night' && !isNight) return false;
      if (fish.timeOfDay === 'day' && !isDay) return false;
    }
    if (fish.weather !== 'any' && fish.weather !== weather) return false;
    return true;
  });
}

export function rollForFish(availableFish, baitId) {
  if (availableFish.length === 0) return null;
  const weighted = availableFish.map(fish => {
    let w = 1;
    if (fish.rarity === RARITY.COMMON) w = 50;
    else if (fish.rarity === RARITY.UNCOMMON) w = 25;
    else if (fish.rarity === RARITY.RARE) w = 10;
    else if (fish.rarity === RARITY.EPIC) w = 3;
    else if (fish.rarity === RARITY.LEGENDARY) w = 1;
    if (fish.preferredBait.includes(baitId)) w *= 1.5;
    return { fish, weight: w };
  });
  const total = weighted.reduce((s, w) => s + w.weight, 0);
  let roll = Math.random() * total;
  for (const { fish, weight } of weighted) {
    roll -= weight;
    if (roll <= 0) return fish;
  }
  return weighted[weighted.length - 1].fish;
}

export function generateFishInstance(fish) {
  const sizeRange = fish.maxSize - fish.minSize;
  const weightRange = fish.maxWeight - fish.minWeight;
  const quality = Math.random();
  const size = +(fish.minSize + sizeRange * quality).toFixed(1);
  const weight = +(fish.minWeight + weightRange * quality).toFixed(2);
  const price = Math.round(fish.basePrice * fish.rarity.priceMultiplier * (0.8 + quality * 0.6));
  return {
    ...fish,
    instanceSize: size,
    instanceWeight: weight,
    instancePrice: price,
    instanceQuality: quality,
    caughtAt: Date.now(),
  };
}
