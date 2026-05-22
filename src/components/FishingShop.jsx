import { useState } from 'react';
import { RODS, BAITS, ACCESSORIES } from '../engine/equipmentData';

export default function FishingShop({ state, onBuy, onClose }) {
  const [tab, setTab] = useState('rods');
  const tabs = [
    { id: 'rods', label: '🎣 Rods' },
    { id: 'bait', label: '🪱 Bait' },
    { id: 'accessories', label: '💍 Accessories' },
  ];

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-6 w-[520px] max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gold-text">{'🛒'} Shop</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm">{'🪙'} <span className="gold-text font-bold">{state.gold}</span></span>
            <button onClick={onClose} className="text-text-dim hover:text-white">{'✖'}</button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded text-xs border ${tab === t.id ? 'bg-gold/20 border-gold/40 text-gold-light' : 'border-border text-text-dim hover:bg-surface'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {tab === 'rods' && RODS.map(rod => {
            const owned = state.ownedRods.includes(rod.id);
            const equipped = state.currentRod === rod.id;
            return (
              <div key={rod.id} className="parchment rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{rod.emoji} {rod.name}</div>
                  <div className="text-xs text-text-dim">{rod.description}</div>
                  <div className="text-xs text-text-dim mt-1">Power: {rod.power}x | Control: {rod.control}x</div>
                </div>
                <div className="text-right">
                  {equipped ? <span className="text-xs text-green-400">Equipped</span>
                    : owned ? <button onClick={() => onBuy('equip_rod', rod.id)} className="px-3 py-1 bg-fish-green/20 hover:bg-fish-green/30 border border-fish-green/30 rounded text-xs text-green-300">Equip</button>
                    : rod.price === 0 ? <span className="text-xs text-text-dim">Free</span>
                    : <button onClick={() => onBuy('rod', rod.id)} disabled={state.gold < rod.price}
                        className="px-3 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded text-xs text-gold-light disabled:opacity-40">
                        {'🪙'}{rod.price}
                      </button>
                  }
                </div>
              </div>
            );
          })}

          {tab === 'bait' && BAITS.map(bait => {
            const count = state.baitInventory[bait.id] || 0;
            return (
              <div key={bait.id} className="parchment rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{bait.emoji} {bait.name} <span className="text-text-dim">({count})</span></div>
                  <div className="text-xs text-text-dim">{bait.description}</div>
                  <div className="text-xs text-text-dim mt-1">Effectiveness: {bait.effectiveness}x</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onBuy('bait', bait.id, 5)} disabled={state.gold < bait.price * 5}
                    className="px-2 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded text-xs text-gold-light disabled:opacity-40">
                    5x ({'🪙'}{bait.price * 5})
                  </button>
                  <button onClick={() => onBuy('bait', bait.id, 10)} disabled={state.gold < bait.price * 10}
                    className="px-2 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded text-xs text-gold-light disabled:opacity-40">
                    10x ({'🪙'}{bait.price * 10})
                  </button>
                  {count > 0 && (
                    <button onClick={() => onBuy('use_bait', bait.id)}
                      className="px-2 py-1 bg-fish-green/20 hover:bg-fish-green/30 border border-fish-green/30 rounded text-xs text-green-300">
                      Use
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {tab === 'accessories' && ACCESSORIES.map(acc => {
            const owned = state.ownedAccessories.includes(acc.id);
            const equipped = state.currentAccessory === acc.id;
            return (
              <div key={acc.id} className="parchment rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{acc.emoji} {acc.name}</div>
                  <div className="text-xs text-text-dim">{acc.description}</div>
                </div>
                <div className="text-right">
                  {equipped ? <span className="text-xs text-green-400">Equipped</span>
                    : owned ? <button onClick={() => onBuy('equip_acc', acc.id)} className="px-3 py-1 bg-fish-green/20 hover:bg-fish-green/30 border border-fish-green/30 rounded text-xs text-green-300">Equip</button>
                    : <button onClick={() => onBuy('accessory', acc.id)} disabled={state.gold < acc.price}
                        className="px-3 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded text-xs text-gold-light disabled:opacity-40">
                        {'🪙'}{acc.price}
                      </button>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
