export const LOCATIONS = [
  { id: 'lake', name: 'Peaceful Lake', emoji: '\u{1F3DE}\u{FE0F}', description: 'A calm, serene lake surrounded by trees. Perfect for beginners.', requiredLevel: 1, ambience: 'Birds chirping, gentle breeze' },
  { id: 'river', name: 'Mountain River', emoji: '\u{1F3D4}\u{FE0F}', description: 'Fast-flowing mountain river with rapids. Home to strong fish.', requiredLevel: 5, ambience: 'Rushing water, wind through pines' },
  { id: 'ocean', name: 'Deep Ocean', emoji: '\u{1F30A}', description: 'The vast open sea. Big fish and big rewards await.', requiredLevel: 10, ambience: 'Crashing waves, seagulls' },
  { id: 'enchanted', name: 'Enchanted Pond', emoji: '\u{2728}', description: 'A magical pond hidden in an ancient forest. Strange things live here.', requiredLevel: 15, ambience: 'Mystical hum, glowing particles' },
  { id: 'volcanic', name: 'Volcanic Hotspring', emoji: '\u{1F30B}', description: 'Superheated waters near an active volcano. Only the brave fish here.', requiredLevel: 20, ambience: 'Bubbling water, distant rumbles' },
];

export function getUnlockedLocations(level) {
  return LOCATIONS.filter(loc => level >= loc.requiredLevel);
}

export function getLocationById(id) {
  return LOCATIONS.find(loc => loc.id === id);
}
