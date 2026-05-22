import { useState } from 'react';
import { FISH, RARITY } from '../engine/fishData';

export default function FishingEncyclopedia({ state, onClose }) {
  const [filter, setFilter] = useState('all');
  const discovered = state.discoveredSpecies || {};
  const discoveredCount = Object.keys(discovered).length;

  let filtered = FISH;
  if (filter === 'discovered') filtered = FISH.filter(f => discovered[f.id]);
  else if (filter === 'undiscovered') filtered = FISH.filter(f => !discovered[f.id]);
  else if (filter === 'common') filtered = FISH.filter(f => f.rarity === RARITY.COMMON);
  else if (filter === 'uncommon') filtered = FISH.filter(f => f.rarity === RARITY.UNCOMMON);
  else if (filter === 'rare') filtered = FISH.filter(f => f.rarity === RARITY.RARE);
  else if (filter === 'epic') filtered = FISH.filter(f => f.rarity === RARITY.EPIC);
  else if (filter === 'legendary') filtered = FISH.filter(f => f.rarity === RARITY.LEGENDARY);

  const filterBtns = [
    { id: 'all', label: `All (${FISH.length})` },
    { id: 'discovered', label: `Found (${discoveredCount})` },
    { id: 'undiscovered', label: `Unknown (${FISH.length - discoveredCount})` },
    { id: 'common', label: '⬜ Common' },
    { id: 'uncommon', label: '🟢 Uncommon' },
    { id: 'rare', label: '🔵 Rare' },
    { id: 'epic', label: '🟣 Epic' },
    { id: 'legendary', label: '🌟 Legendary' },
  ];

  const diffLabel = (d) => d <= 2 ? 'Easy' : d <= 4 ? 'Medium' : d <= 6 ? 'Hard' : d <= 8 ? 'V.Hard' : 'EXTREME';

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-6 w-[600px] max-h-[85vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gold-text">{'📖'} Encyclopedia — {discoveredCount}/{FISH.length}</h2>
          <button onClick={onClose} className="text-text-dim hover:text-white">{'✖'}</button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {filterBtns.map(fb => (
            <button key={fb.id} onClick={() => setFilter(fb.id)}
              className={`px-2 py-1 rounded text-xs border ${filter === fb.id ? 'bg-gold/20 border-gold/40 text-gold-light' : 'border-border text-text-dim hover:bg-surface'}`}>
              {fb.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {filtered.map(fish => {
            const disc = discovered[fish.id];
            return (
              <div key={fish.id} className="parchment rounded-lg p-3 flex items-start gap-3">
                <div className="text-2xl w-10 text-center">{disc ? fish.emoji : '❓'}</div>
                <div className="flex-1">
                  {disc ? (
                    <>
                      <div className="font-bold text-sm">
                        {fish.name}
                        <span className="ml-2 text-xs" style={{ color: fish.rarity.color }}>{'⭐'.repeat(fish.rarity.stars)} {fish.rarity.label}</span>
                      </div>
                      <div className="text-xs text-text-dim">{fish.description}</div>
                      <div className="text-xs text-text-dim mt-1">
                        Size: {fish.minSize}-{fish.maxSize}cm | Weight: {fish.minWeight}-{fish.maxWeight}kg |
                        Difficulty: <span style={{ color: fish.difficulty <= 4 ? '#40b040' : fish.difficulty <= 7 ? '#e8c830' : '#d04040' }}>{diffLabel(fish.difficulty)} ({fish.difficulty}/10)</span>
                      </div>
                      <div className="text-xs text-text-dim">
                        Caught: {disc.count}x | Best: {disc.bestSize}cm / {disc.bestWeight}kg
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-sm text-text-dim">???</div>
                      <div className="text-xs text-text-dim">Undiscovered species</div>
                      <div className="text-xs text-text-dim mt-1">
                        Locations: {fish.locations.join(', ')} | Difficulty: {diffLabel(fish.difficulty)} ({fish.difficulty}/10)
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
