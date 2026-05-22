import { useRef, useEffect } from 'react';
import { drawSky, drawWater, drawClouds, drawRain, drawLandscape, drawCharacter, drawFishingRod, drawBobber, drawUnderwaterFish } from '../engine/sprites';

export default function FishingCanvas({ state, canvasWidth, canvasHeight }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let running = true;

    function render() {
      if (!running) return;
      frameRef.current++;
      const f = frameRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const skyH = drawSky(ctx, w, h, state.timeOfDay, state.weather);
      drawClouds(ctx, w, skyH, f, state.weather);
      drawLandscape(ctx, w, skyH, state.currentLocation, f);
      drawWater(ctx, w, h, skyH, f, state.currentLocation);
      drawUnderwaterFish(ctx, w, skyH, h, f, state.currentLocation);
      drawRain(ctx, w, h, f, state.weather);

      const charX = 150;
      const charY = skyH + 2;
      drawCharacter(ctx, charX, charY);
      drawFishingRod(ctx, charX, charY, state.castPower, state.phase);

      if (['waiting', 'bite'].includes(state.phase)) {
        const bobberX = charX + 80 + state.castPower * 280;
        const bobberY = skyH + 10;
        drawBobber(ctx, bobberX, bobberY, f, state.phase === 'bite');

        if (state.phase === 'bite') {
          ctx.fillStyle = '#e04040';
          ctx.font = 'bold 16px "Press Start 2P", monospace';
          ctx.textAlign = 'center';
          const pulse = Math.sin(f * 0.3) * 3;
          ctx.fillText('! BITE !', bobberX, bobberY - 20 + pulse);
        }
      }

      if (state.phase === 'casting') {
        const barX = charX + 30;
        const barY = skyH - 50;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(barX, barY, 120, 14);
        const pw = state.castPower * 118;
        const grad = ctx.createLinearGradient(barX + 1, barY, barX + 1 + pw, barY);
        grad.addColorStop(0, '#40b040');
        grad.addColorStop(0.6, '#e8c830');
        grad.addColorStop(1, '#d04040');
        ctx.fillStyle = grad;
        ctx.fillRect(barX + 1, barY + 1, pw, 12);
        ctx.fillStyle = '#f0f0f0';
        ctx.font = '10px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('POWER', barX + 60, barY - 4);
      }

      requestAnimationFrame(render);
    }

    render();
    return () => { running = false; };
  }, [state.timeOfDay, state.weather, state.currentLocation, state.castPower, state.phase]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="rounded-lg border border-gold/20"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
