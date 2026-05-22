import { LOCATIONS } from '../engine/locationData';

export default function FishingMap({ state, onChangeLocation, onClose }) {
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-6 w-[500px] max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gold-text">{'🗺️'} Locations</h2>
          <button onClick={onClose} className="text-text-dim hover:text-white">{'✖'}</button>
        </div>

        <div className="space-y-3">
          {LOCATIONS.map(loc => {
            const unlocked = state.level >= loc.requiredLevel;
            const isCurrent = state.currentLocation === loc.id;
            return (
              <div key={loc.id}
                className={`parchment rounded-lg p-4 ${isCurrent ? 'border-gold/40 gold-glow' : ''} ${!unlocked ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{loc.emoji} {loc.name}</div>
                    <div className="text-xs text-text-dim mt-1">{loc.description}</div>
                    <div className="text-xs text-text-dim mt-1">{'🎵'} {loc.ambience}</div>
                  </div>
                  <div className="text-right">
                    {isCurrent ? (
                      <span className="text-xs text-green-400">Current</span>
                    ) : unlocked ? (
                      <button onClick={() => onChangeLocation(loc.id)}
                        className="px-3 py-1.5 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded text-xs text-gold-light">
                        Travel
                      </button>
                    ) : (
                      <span className="text-xs text-red-400">{'🔒'} Lv.{loc.requiredLevel}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
