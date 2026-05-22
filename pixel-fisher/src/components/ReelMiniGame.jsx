import { useState, useEffect, useCallback, useRef } from 'react';

export default function ReelMiniGame({ fish, rodPower, rodControl, accessoryEffect, onComplete }) {
  const [tension, setTension] = useState(50);
  const [progress, setProgress] = useState(0);
  const [reeling, setReeling] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const reelingRef = useRef(false);

  const difficulty = fish.difficulty || 5;
  const maxTime = 15 + (10 - difficulty) * 2;
  const tensionControl = accessoryEffect === 'tension_control' ? 0.8 : 1;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        const next = prev + 0.05;
        if (next >= maxTime) {
          clearInterval(intervalRef.current);
          onComplete(false, 0);
        }
        return next;
      });

      setTension(prev => {
        const fishPull = (Math.sin(Date.now() * 0.003 * difficulty) * 2 + Math.random() * 1.5) * difficulty * 0.3 * tensionControl;
        const reelPull = reelingRef.current ? -3 * (rodControl || 1) : 2;
        let next = prev + fishPull + reelPull;
        next = Math.max(0, Math.min(100, next));

        if (next <= 5 || next >= 95) {
          clearInterval(intervalRef.current);
          onComplete(false, 0);
        }
        return next;
      });

      setProgress(prev => {
        const inZone = reelingRef.current;
        const rate = inZone ? 1.5 * (rodPower || 1) / difficulty : -0.3 * difficulty * 0.2;
        const next = Math.max(0, Math.min(100, prev + rate));
        if (next >= 100) {
          clearInterval(intervalRef.current);
          const accuracy = 100 - Math.abs(50 - tension) * 2;
          onComplete(true, accuracy);
        }
        return next;
      });
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [difficulty, maxTime, onComplete, rodControl, rodPower, tension, tensionControl]);

  const handleDown = useCallback(() => { setReeling(true); reelingRef.current = true; }, []);
  const handleUp = useCallback(() => { setReeling(false); reelingRef.current = false; }, []);

  useEffect(() => {
    const kd = (e) => { if (e.code === 'Space') { e.preventDefault(); handleDown(); } };
    const ku = (e) => { if (e.code === 'Space') handleUp(); };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, [handleDown, handleUp]);

  const tensionColor = tension >= 35 && tension <= 65 ? '#40b040' : tension >= 20 && tension <= 80 ? '#e8c830' : '#d04040';
  const diffLabel = difficulty <= 2 ? 'Easy' : difficulty <= 4 ? 'Medium' : difficulty <= 6 ? 'Hard' : difficulty <= 8 ? 'Very Hard' : 'EXTREME';
  const diffColor = difficulty <= 2 ? '#40b040' : difficulty <= 4 ? '#e8c830' : difficulty <= 6 ? '#e08030' : '#d04040';

  return (
    <div
      className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onTouchStart={handleDown}
      onTouchEnd={handleUp}
    >
      <div className="parchment rounded-xl p-6 w-[400px] text-center space-y-4">
        <div className="text-lg font-bold gold-text">{fish.emoji} {fish.name}</div>
        <div className="text-xs" style={{ color: diffColor }}>Difficulty: {diffLabel} ({difficulty}/10)</div>

        {/* Tension meter */}
        <div>
          <div className="text-xs text-text-dim mb-1">Tension</div>
          <div className="h-6 bg-black/40 rounded-full relative overflow-hidden">
            <div className="absolute top-0 h-full bg-green-500/20 rounded-full" style={{ left: '35%', width: '30%' }} />
            <div className="absolute top-0 h-full rounded-full transition-all duration-75" style={{ width: `${tension}%`, backgroundColor: tensionColor }} />
          </div>
          <div className="text-xs text-text-dim mt-1">Keep in green zone (35-65%)</div>
        </div>

        {/* Progress */}
        <div>
          <div className="text-xs text-text-dim mb-1">Catch Progress</div>
          <div className="h-4 bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Timer */}
        <div className="text-xs text-text-dim">
          Time: {Math.max(0, maxTime - timer).toFixed(1)}s
        </div>

        <div className="text-sm text-gold-light animate-pulse">
          {reeling ? '🎣 Reeling...' : 'Hold CLICK or SPACE to reel!'}
        </div>
      </div>
    </div>
  );
}
