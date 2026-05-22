export default function FishingInventory({ state, onSellFish, onSellAll, onClose }) {
  const totalValue = state.caughtFish.reduce((s, f) => s + f.instancePrice, 0);

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-6 w-[500px] max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gold-text">{'🎒'} Inventory ({state.caughtFish.length})</h2>
          <button onClick={onClose} className="text-text-dim hover:text-white">{'✖'}</button>
        </div>

        {state.caughtFish.length > 0 && (
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="text-text-dim">Total: {'🪙'}<span className="gold-text">{totalValue}</span></span>
            <button onClick={onSellAll} className="px-3 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded text-xs text-gold-light">
              Sell All ({'🪙'}{totalValue})
            </button>
          </div>
        )}

        {state.caughtFish.length === 0 ? (
          <p className="text-center text-text-dim py-8">No fish in inventory. Go catch some!</p>
        ) : (
          <div className="space-y-2">
            {state.caughtFish.map((fish, i) => (
              <div key={i} className="parchment rounded-lg p-3 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold">{fish.emoji} {fish.name}</span>
                  <span className="text-xs ml-2" style={{ color: fish.rarity.color }}>{fish.rarity.label}</span>
                  <div className="text-xs text-text-dim">{fish.instanceSize}cm | {fish.instanceWeight}kg | Diff: {fish.difficulty}/10</div>
                </div>
                <button onClick={() => onSellFish(i)} className="px-3 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded text-xs text-gold-light">
                  {'🪙'}{fish.instancePrice}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
