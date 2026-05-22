import { useState } from 'react';

export default function FishingSettings({ state, onUpdateMiMo, onDeleteSave, onClose }) {
  const [apiKey, setApiKey] = useState(state.mimoApiKey || '');

  const handleSave = () => {
    onUpdateMiMo(apiKey);
  };

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-6 w-[480px] max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gold-text">{'⚙️'} Settings</h2>
          <button onClick={onClose} className="text-text-dim hover:text-white">{'✖'}</button>
        </div>

        {/* Beta notice */}
        <div className="parchment rounded-lg p-3 mb-4 border border-red-500/20">
          <div className="text-xs text-red-300 font-bold">BETA 0.0.1 — Still in Development</div>
          <div className="text-xs text-text-dim mt-1">This game is still being developed. Some features may change.</div>
        </div>

        {/* MiMo AI Integration */}
        <div className="parchment rounded-lg p-4 mb-4">
          <h3 className="font-bold text-sm mb-2">{'🤖'} MiMo AI Companion (Optional)</h3>
          <p className="text-xs text-text-dim mb-3">
            Connect your Xiaomi MiMo API key to enable the AI fishing companion.
            The AI will give you tips, tell stories, and help you fish better!
          </p>
          <div className="space-y-2">
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="Enter MiMo API Key..."
              className="w-full px-3 py-2 bg-black/30 border border-border rounded text-sm text-text placeholder:text-text-dim/50 focus:outline-none focus:border-gold/40"
            />
            <button onClick={handleSave}
              className="w-full px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded text-sm text-blue-300">
              {state.mimoEnabled ? '✔ Update API Key' : 'Enable AI Companion'}
            </button>
          </div>
          <div className="mt-3 space-y-1">
            <a href="https://100t.xiaomimimo.com/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 block">
              {'🎮'} Join MiMo Orbit 100T Creator Incentive Program
            </a>
            <a href="https://platform.xiaomimimo.com/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 block">
              {'🔑'} Get API Key from MiMo Platform
            </a>
          </div>
        </div>

        {/* Game Stats */}
        <div className="parchment rounded-lg p-4 mb-4">
          <h3 className="font-bold text-sm mb-2">{'📊'} Game Stats</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-text-dim">
            <div>Level: <span className="text-text">{state.level}</span></div>
            <div>Gold Earned: <span className="text-text">{state.stats.totalGoldEarned}</span></div>
            <div>Fish Caught: <span className="text-text">{state.stats.totalCaught}</span></div>
            <div>Fish Lost: <span className="text-text">{state.stats.totalLost}</span></div>
            <div>Species Found: <span className="text-text">{state.stats.speciesDiscovered}</span></div>
            <div>Best Streak: <span className="text-text">{state.stats.bestStreak}</span></div>
            <div>Biggest Fish: <span className="text-text">{state.stats.biggestSize}cm</span></div>
            <div>Perfect Reels: <span className="text-text">{state.stats.perfectReels}</span></div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="parchment rounded-lg p-4 border border-red-500/20">
          <h3 className="font-bold text-sm text-red-400 mb-2">{'⚠️'} Danger Zone</h3>
          <button onClick={onDeleteSave}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded text-sm text-red-300">
            {'🗑️'} Delete Save Data
          </button>
        </div>
      </div>
    </div>
  );
}
