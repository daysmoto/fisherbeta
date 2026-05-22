export const ACHIEVEMENTS = [
  // Fishing milestones
  { id: 'first_catch', name: 'First Catch', emoji: '\u{1F3A3}', description: 'Catch your first fish', condition: s => s.totalCaught >= 1 },
  { id: 'ten_catches', name: 'Angler', emoji: '\u{1F41F}', description: 'Catch 10 fish', condition: s => s.totalCaught >= 10 },
  { id: 'fifty_catches', name: 'Fisher', emoji: '\u{1F3C5}', description: 'Catch 50 fish', condition: s => s.totalCaught >= 50 },
  { id: 'hundred_catches', name: 'Master Angler', emoji: '\u{1F3C6}', description: 'Catch 100 fish', condition: s => s.totalCaught >= 100 },
  { id: 'five_hundred_catches', name: 'Fish Whisperer', emoji: '\u{1F451}', description: 'Catch 500 fish', condition: s => s.totalCaught >= 500 },

  // Rarity achievements
  { id: 'first_uncommon', name: 'Getting Better', emoji: '\u{1F7E2}', description: 'Catch an Uncommon fish', condition: s => s.rarityCount?.uncommon >= 1 },
  { id: 'first_rare', name: 'Lucky Day', emoji: '\u{1F535}', description: 'Catch a Rare fish', condition: s => s.rarityCount?.rare >= 1 },
  { id: 'first_epic', name: 'Epic Discovery', emoji: '\u{1F7E3}', description: 'Catch an Epic fish', condition: s => s.rarityCount?.epic >= 1 },
  { id: 'first_legendary', name: 'Legendary!', emoji: '\u{1F31F}', description: 'Catch a Legendary fish', condition: s => s.rarityCount?.legendary >= 1 },
  { id: 'five_legendary', name: 'Legend Slayer', emoji: '\u{2604}\u{FE0F}', description: 'Catch 5 Legendary fish', condition: s => s.rarityCount?.legendary >= 5 },

  // Gold achievements
  { id: 'first_hundred_gold', name: 'Pocket Change', emoji: '\u{1FA99}', description: 'Earn 100 gold', condition: s => s.totalGoldEarned >= 100 },
  { id: 'thousand_gold', name: 'Wealthy', emoji: '\u{1F4B0}', description: 'Earn 1,000 gold', condition: s => s.totalGoldEarned >= 1000 },
  { id: 'ten_thousand_gold', name: 'Rich Fisher', emoji: '\u{1F48E}', description: 'Earn 10,000 gold', condition: s => s.totalGoldEarned >= 10000 },

  // Level achievements
  { id: 'level_5', name: 'Getting Started', emoji: '\u{1F4C8}', description: 'Reach level 5', condition: s => s.level >= 5 },
  { id: 'level_10', name: 'Experienced', emoji: '\u{1F4CA}', description: 'Reach level 10', condition: s => s.level >= 10 },
  { id: 'level_20', name: 'Veteran', emoji: '\u{2B50}', description: 'Reach level 20', condition: s => s.level >= 20 },
  { id: 'level_30', name: 'Grand Master', emoji: '\u{1F31F}', description: 'Reach level 30', condition: s => s.level >= 30 },

  // Special
  { id: 'all_locations', name: 'World Traveler', emoji: '\u{1F30D}', description: 'Unlock all 5 locations', condition: s => s.level >= 20 },
  { id: 'encyclopedia_10', name: 'Collector', emoji: '\u{1F4D6}', description: 'Discover 10 different species', condition: s => s.speciesDiscovered >= 10 },
  { id: 'encyclopedia_25', name: 'Naturalist', emoji: '\u{1F9EC}', description: 'Discover 25 different species', condition: s => s.speciesDiscovered >= 25 },
  { id: 'encyclopedia_50', name: 'Ichthyologist', emoji: '\u{1F52C}', description: 'Discover all 59 species', condition: s => s.speciesDiscovered >= 50 },
  { id: 'storm_catch', name: 'Storm Chaser', emoji: '\u{26C8}\u{FE0F}', description: 'Catch a fish during a storm', condition: s => s.stormCatches >= 1 },
  { id: 'night_fisher', name: 'Night Owl', emoji: '\u{1F989}', description: 'Catch 10 fish at night', condition: s => s.nightCatches >= 10 },
  { id: 'big_one', name: 'The Big One', emoji: '\u{1F40B}', description: 'Catch a fish over 100cm', condition: s => s.biggestSize >= 100 },
  { id: 'perfect_reel', name: 'Perfect Reel', emoji: '\u{1F3AF}', description: 'Complete a reel with 95%+ accuracy', condition: s => s.perfectReels >= 1 },
  { id: 'streak_5', name: 'Hot Streak', emoji: '\u{1F525}', description: 'Catch 5 fish in a row', condition: s => s.bestStreak >= 5 },
  { id: 'streak_10', name: 'Unstoppable', emoji: '\u{1F4A5}', description: 'Catch 10 fish in a row', condition: s => s.bestStreak >= 10 },
];

export function checkAchievements(stats, unlockedIds) {
  const newlyUnlocked = [];
  for (const ach of ACHIEVEMENTS) {
    if (!unlockedIds.includes(ach.id) && ach.condition(stats)) {
      newlyUnlocked.push(ach);
    }
  }
  return newlyUnlocked;
}
