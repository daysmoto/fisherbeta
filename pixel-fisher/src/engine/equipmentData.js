export const RODS = [
  { id: 'bamboo', name: 'Bamboo Rod', emoji: '\u{1F38D}', quality: 1, power: 1.0, control: 1.0, price: 0, description: 'Basic bamboo rod. Gets the job done.' },
  { id: 'wooden', name: 'Wooden Rod', emoji: '\u{1FAB5}', quality: 2, power: 1.3, control: 1.2, price: 100, description: 'Sturdy wooden rod. Better control.' },
  { id: 'carbon', name: 'Carbon Fiber', emoji: '\u{26AB}', quality: 3, power: 1.6, control: 1.5, price: 500, description: 'Modern carbon fiber. Light and strong.' },
  { id: 'titanium', name: 'Titanium Rod', emoji: '\u{1F529}', quality: 4, power: 2.0, control: 1.8, price: 1500, description: 'Premium titanium alloy. Serious equipment.' },
  { id: 'mythril', name: 'Mythril Rod', emoji: '\u{1F52E}', quality: 5, power: 2.5, control: 2.2, price: 5000, description: 'Enchanted mythril. Responds to your will.' },
  { id: 'golden', name: 'Golden Rod', emoji: '\u{1F451}', quality: 6, power: 3.0, control: 2.5, price: 15000, description: 'The ultimate fishing rod. Pure gold craftsmanship.' },
];

export const BAITS = [
  { id: 'earthworm', name: 'Earthworm', emoji: '\u{1FAB1}', effectiveness: 1.0, price: 2, description: 'Common earthworm. Works on most fish.' },
  { id: 'cricket', name: 'Cricket', emoji: '\u{1F997}', effectiveness: 1.2, price: 5, description: 'Crunchy cricket. Attracts panfish.' },
  { id: 'minnow', name: 'Minnow', emoji: '\u{1F41F}', effectiveness: 1.5, price: 10, description: 'Live minnow. Predators love it.' },
  { id: 'shrimp', name: 'Shrimp', emoji: '\u{1F990}', effectiveness: 1.8, price: 20, description: 'Juicy shrimp. Great for ocean fish.' },
  { id: 'special_lure', name: 'Special Lure', emoji: '\u{1FA9D}', effectiveness: 2.2, price: 50, description: 'Handcrafted lure. Attracts rare fish.' },
  { id: 'golden_bait', name: 'Golden Bait', emoji: '\u{2728}', effectiveness: 3.0, price: 150, description: 'Gold-flecked bait. Irresistible to epic fish.' },
  { id: 'magic_bait', name: 'Magic Bait', emoji: '\u{1F52E}', effectiveness: 4.0, price: 500, description: 'Enchanted bait from another realm.' },
];

export const ACCESSORIES = [
  { id: 'lucky_hat', name: 'Lucky Hat', emoji: '\u{1F3A9}', price: 200, effect: 'rare_chance', value: 1.3, description: '+30% rare fish chance' },
  { id: 'fish_finder', name: 'Fish Finder', emoji: '\u{1F4E1}', price: 400, effect: 'bite_speed', value: 0.7, description: '-30% wait time for bites' },
  { id: 'power_gloves', name: 'Power Gloves', emoji: '\u{1F9E4}', price: 600, effect: 'tension_control', value: 0.8, description: 'Easier tension control (+20%)' },
  { id: 'long_line', name: 'Long Line', emoji: '\u{1F3A3}', price: 350, effect: 'cast_distance', value: 1.5, description: '+50% cast distance' },
  { id: 'tackle_box', name: 'Tackle Box', emoji: '\u{1F9F0}', price: 800, effect: 'catch_rate', value: 1.3, description: '+30% catch success rate' },
  { id: 'ancient_charm', name: 'Ancient Charm', emoji: '\u{1F4FF}', price: 2000, effect: 'rare_chance', value: 1.6, description: '+60% rare fish chance. Mysterious aura.' },
];

export function getRodById(id) { return RODS.find(r => r.id === id); }
export function getBaitById(id) { return BAITS.find(b => b.id === id); }
export function getAccessoryById(id) { return ACCESSORIES.find(a => a.id === id); }
