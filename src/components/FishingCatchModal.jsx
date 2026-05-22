export default function FishingCatchModal({ fish, caught, onKeep, onSell, onDismiss }) {
  if (!caught) {
    return (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
        <div className="parchment rounded-xl p-8 w-[380px] text-center space-y-4">
          <div className="text-5xl">{'😞'}</div>
          <h2 className="text-xl font-bold text-red-400">Fish Got Away!</h2>
          <p className="text-sm text-text-dim">Better luck next time...</p>
          <button onClick={onDismiss} className="px-6 py-2 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded-lg text-gold-light">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stars = '⭐'.repeat(fish.rarity.stars);
  const diffLabel = fish.difficulty <= 2 ? 'Easy' : fish.difficulty <= 4 ? 'Medium' : fish.difficulty <= 6 ? 'Hard' : fish.difficulty <= 8 ? 'Very Hard' : 'EXTREME';

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-8 w-[380px] text-center space-y-3">
        <div className="text-5xl">{fish.emoji}</div>
        <h2 className="text-xl font-bold gold-text">{fish.name}</h2>
        <div className="text-sm" style={{ color: fish.rarity.color }}>{stars} {fish.rarity.label}</div>
        <div className="text-xs text-text-dim">Difficulty: {diffLabel} ({fish.difficulty}/10)</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="parchment rounded p-2">
            <div className="text-text-dim text-xs">Size</div>
            <div className="gold-text">{fish.instanceSize} cm</div>
          </div>
          <div className="parchment rounded p-2">
            <div className="text-text-dim text-xs">Weight</div>
            <div className="gold-text">{fish.instanceWeight} kg</div>
          </div>
        </div>
        <div className="text-xs text-text-dim italic">{fish.description}</div>
        <div className="text-lg">{'🪙'} <span className="gold-text font-bold">{fish.instancePrice}</span></div>
        <div className="flex gap-3 justify-center pt-2">
          <button onClick={onKeep} className="px-5 py-2 bg-fish-green/20 hover:bg-fish-green/30 border border-fish-green/30 rounded-lg text-green-300">
            {'📦'} Keep
          </button>
          <button onClick={onSell} className="px-5 py-2 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded-lg text-gold-light">
            {'🪙'} Sell ({fish.instancePrice}g)
          </button>
        </div>
      </div>
    </div>
  );
}
