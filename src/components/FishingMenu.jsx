import { loadGame } from '../engine/gameState';

export default function FishingMenu({ onStart, onContinue, onSettings }) {
  const savedGame = loadGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0e1a30 50%, #1a3050 100%)' }}>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="absolute rounded-full animate-float"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7 + 10) % 100}%`,
              width: `${3 + i % 4}px`,
              height: `${3 + i % 4}px`,
              backgroundColor: `rgba(212,168,67,${0.1 + (i % 5) * 0.03})`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i % 3}s`,
            }} />
        ))}
      </div>

      {/* Beta label */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-xs text-red-300">
        BETA 0.0.1 — Still in Development
      </div>

      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="text-7xl mb-4 animate-float">{'🎣'}</div>
        <h1 className="text-5xl font-bold gold-text mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
          Pixel Fisher
        </h1>
        <p className="text-text-dim text-lg">A Pixel Art Fishing Adventure</p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-text-dim">
          <span>Powered by</span>
          <a href="https://100t.xiaomimimo.com/" target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline">
            Xiaomi MiMo Orbit 100T
          </a>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-72 relative z-10">
        {savedGame && (
          <button onClick={onContinue}
            className="w-full py-3 px-6 bg-gold/20 hover:bg-gold/30 border border-gold/40 rounded-lg text-lg font-bold gold-text gold-glow transition-all">
            {'▶️'} Continue
          </button>
        )}
        {savedGame && (
          <div className="text-center text-xs text-text-dim -mt-1 mb-1">
            Lv.{savedGame.level} | {'🪙'}{savedGame.gold} | {savedGame.stats.totalCaught} fish caught
          </div>
        )}
        <button onClick={onStart}
          className="w-full py-3 px-6 bg-fish-green/20 hover:bg-fish-green/30 border border-fish-green/40 rounded-lg text-lg font-bold text-green-300 transition-all">
          {'🎮'} {savedGame ? 'New Game' : 'Start Fishing'}
        </button>
        <button onClick={onSettings}
          className="w-full py-2 px-6 bg-surface hover:bg-surface/80 border border-border rounded-lg text-sm text-text-dim transition-all">
          {'⚙️'} Settings
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-xs text-text-dim">
        <a href="https://100t.xiaomimimo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
          {'🎮'} Join MiMo Orbit 100T Creator Incentive Program
        </a>
      </div>
    </div>
  );
}
