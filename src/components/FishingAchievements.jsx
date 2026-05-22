import { ACHIEVEMENTS } from '../engine/achievementData';

export default function FishingAchievements({ state, onClose }) {
  const unlocked = state.unlockedAchievements || [];

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-6 w-[500px] max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gold-text">{'🏆'} Achievements — {unlocked.length}/{ACHIEVEMENTS.length}</h2>
          <button onClick={onClose} className="text-text-dim hover:text-white">{'✖'}</button>
        </div>

        <div className="space-y-2">
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlocked.includes(ach.id);
            return (
              <div key={ach.id} className={`parchment rounded-lg p-3 flex items-center gap-3 ${isUnlocked ? '' : 'opacity-50'}`}>
                <div className="text-2xl">{isUnlocked ? ach.emoji : '🔒'}</div>
                <div>
                  <div className="font-bold text-sm">{ach.name}</div>
                  <div className="text-xs text-text-dim">{ach.description}</div>
                </div>
                {isUnlocked && <div className="ml-auto text-green-400 text-xs">{'✔'}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
