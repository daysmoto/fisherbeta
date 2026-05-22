// Color palette
const PAL = {
  // Water
  waterDeep: '#0a2848', waterMid: '#104070', waterLight: '#1860a0',
  waterFoam: '#80c0e0', waterSurface: '#3080c0',
  // Sky
  skyDay: '#4090e0', skyDawn: '#e08050', skyDusk: '#803060',
  skyNight: '#0a1030', skyMid: '#2060b0',
  // Ground
  grass: '#308030', dirt: '#6a4a2a', sand: '#d0b880', stone: '#707070',
  snow: '#e0e8f0', lava: '#d04020', volcanic: '#302020',
  // Nature
  treeTrunk: '#5a3a1a', treeLeaf: '#208020', treeLeafDark: '#106010',
  // Character
  skin: '#e0a870', hair: '#4a3020', shirt: '#3060a0', pants: '#404060',
  // Equipment
  wood: '#8a6030', metal: '#a0a0b0', string: '#d0d0d0', cork: '#d08040',
  // UI
  gold: '#d4a843', red: '#d04040', green: '#40b040', blue: '#4080d0',
  white: '#f0f0f0', black: '#101010',
};

function setPixel(ctx, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
}

function drawRect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
}

// ===== SKY =====
export function drawSky(ctx, w, h, timeOfDay, weather) {
  const skyH = h * 0.55;
  const gradient = ctx.createLinearGradient(0, 0, 0, skyH);
  const isNight = timeOfDay < 0.25 || timeOfDay > 0.75;
  const isDawn = timeOfDay >= 0.2 && timeOfDay < 0.35;
  const isDusk = timeOfDay >= 0.65 && timeOfDay <= 0.8;

  if (isNight && !isDawn && !isDusk) {
    gradient.addColorStop(0, '#050818');
    gradient.addColorStop(1, '#0a1838');
  } else if (isDawn) {
    gradient.addColorStop(0, '#203060');
    gradient.addColorStop(0.5, '#e08050');
    gradient.addColorStop(1, '#f0c070');
  } else if (isDusk) {
    gradient.addColorStop(0, '#301838');
    gradient.addColorStop(0.5, '#c05040');
    gradient.addColorStop(1, '#e09050');
  } else {
    gradient.addColorStop(0, weather === 'stormy' ? '#303840' : weather === 'rainy' ? '#506070' : weather === 'cloudy' ? '#708090' : '#2070c0');
    gradient.addColorStop(1, weather === 'stormy' ? '#405060' : weather === 'rainy' ? '#607888' : weather === 'cloudy' ? '#90a8b8' : '#80c0e8');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, skyH);

  // Stars at night
  if (isNight && !isDawn && !isDusk) {
    for (let i = 0; i < 40; i++) {
      const sx = (i * 137 + 50) % w;
      const sy = (i * 89 + 30) % (skyH * 0.8);
      const brightness = 150 + ((i * 47) % 105);
      setPixel(ctx, sx, sy, `rgb(${brightness},${brightness},${brightness + 30})`, i % 3 === 0 ? 2 : 1);
    }
    // Moon
    const moonX = w * 0.8;
    const moonY = skyH * 0.15;
    ctx.fillStyle = '#f0e8c0';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#050818';
    ctx.beginPath();
    ctx.arc(moonX + 6, moonY - 4, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sun during day
  if (!isNight) {
    const sunProgress = (timeOfDay - 0.25) / 0.5;
    const sunX = w * 0.2 + sunProgress * w * 0.6;
    const sunY = skyH * 0.15 + Math.sin(sunProgress * Math.PI) * (-skyH * 0.05);
    ctx.fillStyle = '#f0d040';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f8e870';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  return skyH;
}

// ===== WATER =====
export function drawWater(ctx, w, h, skyH, frame, locationId) {
  const waterH = h - skyH;
  let deepColor, midColor, surfColor;

  if (locationId === 'volcanic') {
    deepColor = '#301010'; midColor = '#502020'; surfColor = '#803020';
  } else if (locationId === 'enchanted') {
    deepColor = '#0a1838'; midColor = '#102850'; surfColor = '#1a4070';
  } else if (locationId === 'ocean') {
    deepColor = '#041830'; midColor = '#0a3058'; surfColor = '#1050a0';
  } else if (locationId === 'river') {
    deepColor = '#0a2840'; midColor = '#104860'; surfColor = '#2068a0';
  } else {
    deepColor = '#0a2848'; midColor = '#104070'; surfColor = '#1860a0';
  }

  const gradient = ctx.createLinearGradient(0, skyH, 0, h);
  gradient.addColorStop(0, surfColor);
  gradient.addColorStop(0.3, midColor);
  gradient.addColorStop(1, deepColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, skyH, w, waterH);

  // Waves
  for (let x = 0; x < w; x += 3) {
    const waveY = skyH + Math.sin((x + frame * 2) / 30) * 3 + Math.sin((x + frame) / 15) * 1.5;
    ctx.fillStyle = 'rgba(128,192,224,0.15)';
    ctx.fillRect(x, waveY, 3, 2);
  }

  // Surface shimmer
  for (let i = 0; i < 8; i++) {
    const sx = ((i * 97 + frame * 0.5) % w);
    const sy = skyH + 5 + Math.sin((sx + frame) / 20) * 2;
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(sx, sy, 15 + (i % 3) * 5, 1);
  }

  // Bubbles
  for (let i = 0; i < 5; i++) {
    const bx = (i * 157 + frame * 0.3) % w;
    const by = skyH + 30 + ((i * 73 + frame * 0.5) % (waterH - 40));
    const br = 2 + (i % 2);
    ctx.strokeStyle = 'rgba(128,192,224,0.15)';
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// ===== CLOUDS =====
export function drawClouds(ctx, w, skyH, frame, weather) {
  const cloudCount = weather === 'sunny' ? 3 : weather === 'cloudy' ? 6 : weather === 'rainy' ? 7 : 8;
  for (let i = 0; i < cloudCount; i++) {
    const cx = ((i * 187 + frame * (0.2 + i * 0.05)) % (w + 100)) - 50;
    const cy = 20 + (i * 43) % (skyH * 0.4);
    const cw = 40 + (i * 23) % 40;
    const alpha = weather === 'stormy' ? 0.6 : weather === 'rainy' ? 0.5 : 0.3;
    const color = weather === 'stormy' ? '60,60,70' : weather === 'rainy' ? '120,130,140' : '240,240,240';
    ctx.fillStyle = `rgba(${color},${alpha})`;
    ctx.beginPath();
    ctx.ellipse(cx, cy, cw, cw * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx - cw * 0.3, cy + 3, cw * 0.6, cw * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ===== RAIN =====
export function drawRain(ctx, w, h, frame, weather) {
  if (weather !== 'rainy' && weather !== 'stormy') return;
  const drops = weather === 'stormy' ? 80 : 40;
  ctx.strokeStyle = weather === 'stormy' ? 'rgba(180,200,220,0.4)' : 'rgba(160,190,220,0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < drops; i++) {
    const rx = (i * 73 + frame * 3) % w;
    const ry = (i * 47 + frame * 6) % h;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx - 2, ry + 8);
    ctx.stroke();
  }
}

// ===== LANDSCAPE =====
export function drawLandscape(ctx, w, skyH, locationId, frame) {
  const groundY = skyH - 10;

  if (locationId === 'lake') {
    // Grass bank
    drawRect(ctx, 0, groundY - 20, 120, 30, '#2a6a2a');
    drawRect(ctx, 0, groundY - 15, 130, 25, '#308030');
    // Trees
    drawTree(ctx, 30, groundY - 20);
    drawTree(ctx, 80, groundY - 25);
    drawTree(ctx, 110, groundY - 18);
    // Dock
    drawRect(ctx, 120, groundY - 5, 60, 6, PAL.wood);
    drawRect(ctx, 120, groundY - 5, 4, 20, PAL.wood);
    drawRect(ctx, 176, groundY - 5, 4, 20, PAL.wood);
    // Flowers
    for (let i = 0; i < 5; i++) {
      const fx = 10 + i * 20;
      setPixel(ctx, fx, groundY - 22 - (i % 3), i % 2 ? '#e04060' : '#e0e040', 3);
    }
  } else if (locationId === 'river') {
    // Rocky bank
    drawRect(ctx, 0, groundY - 15, 100, 25, '#606060');
    drawRect(ctx, 0, groundY - 10, 110, 20, '#808080');
    // Pine trees
    drawPineTree(ctx, 20, groundY - 15);
    drawPineTree(ctx, 60, groundY - 20);
    drawPineTree(ctx, 90, groundY - 12);
    // Rocks
    drawRock(ctx, 40, groundY - 12);
    drawRock(ctx, 100, groundY - 8);
    // Snow caps on distant mountains
    const mtns = [{ x: 0, h: 60 }, { x: 50, h: 80 }, { x: 120, h: 50 }];
    for (const m of mtns) {
      ctx.fillStyle = '#404858';
      ctx.beginPath();
      ctx.moveTo(m.x, groundY - 20);
      ctx.lineTo(m.x + 40, groundY - 20 - m.h);
      ctx.lineTo(m.x + 80, groundY - 20);
      ctx.fill();
      ctx.fillStyle = '#e0e8f0';
      ctx.beginPath();
      ctx.moveTo(m.x + 30, groundY - 20 - m.h + 12);
      ctx.lineTo(m.x + 40, groundY - 20 - m.h);
      ctx.lineTo(m.x + 50, groundY - 20 - m.h + 12);
      ctx.fill();
    }
  } else if (locationId === 'ocean') {
    // Sandy shore
    drawRect(ctx, 0, groundY - 10, 100, 20, '#d0b070');
    drawRect(ctx, 0, groundY - 5, 110, 15, '#d8c088');
    // Pier
    drawRect(ctx, 100, groundY - 8, 80, 5, PAL.wood);
    for (let p = 0; p < 4; p++) drawRect(ctx, 105 + p * 20, groundY - 8, 3, 25, PAL.wood);
    // Seashells
    setPixel(ctx, 20, groundY - 8, '#e0a0a0', 3);
    setPixel(ctx, 50, groundY - 6, '#e0d0a0', 3);
    setPixel(ctx, 75, groundY - 9, '#a0d0e0', 3);
    // Palm tree
    drawPalmTree(ctx, 40, groundY - 10);
  } else if (locationId === 'enchanted') {
    // Mystical bank
    drawRect(ctx, 0, groundY - 15, 120, 25, '#1a3020');
    drawRect(ctx, 0, groundY - 10, 130, 20, '#204030');
    // Glowing mushrooms
    for (let i = 0; i < 4; i++) {
      const mx = 15 + i * 28;
      const mc = i % 2 ? '#a040e0' : '#40a0e0';
      drawRect(ctx, mx, groundY - 18, 3, 6, '#806040');
      ctx.fillStyle = mc;
      ctx.beginPath();
      ctx.arc(mx + 1, groundY - 19, 5, Math.PI, 0);
      ctx.fill();
      // Glow
      ctx.fillStyle = mc.replace(')', ',0.15)').replace('rgb', 'rgba');
      ctx.beginPath();
      ctx.arc(mx + 1, groundY - 19, 12, 0, Math.PI * 2);
      ctx.fill();
    }
    // Glowing particles
    for (let i = 0; i < 10; i++) {
      const px = (i * 43 + frame * 0.3) % 140;
      const py = groundY - 30 - Math.sin(frame * 0.03 + i) * 15 - (i * 7) % 30;
      setPixel(ctx, px, py, `rgba(160,220,160,${0.2 + Math.sin(frame * 0.05 + i) * 0.15})`, 2);
    }
    drawMagicTree(ctx, 50, groundY - 15);
  } else if (locationId === 'volcanic') {
    // Volcanic shore
    drawRect(ctx, 0, groundY - 15, 120, 25, '#2a1a1a');
    drawRect(ctx, 0, groundY - 10, 130, 20, '#3a2020');
    // Lava cracks
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = '#d04020';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10 + i * 35, groundY - 8);
      ctx.lineTo(20 + i * 35, groundY - 12);
      ctx.lineTo(30 + i * 35, groundY - 6);
      ctx.stroke();
    }
    // Volcano in background
    ctx.fillStyle = '#2a1818';
    ctx.beginPath();
    ctx.moveTo(0, groundY - 20);
    ctx.lineTo(60, groundY - 100);
    ctx.lineTo(120, groundY - 20);
    ctx.fill();
    // Lava glow at top
    ctx.fillStyle = '#d04020';
    ctx.beginPath();
    ctx.arc(60, groundY - 95, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e08040';
    ctx.beginPath();
    ctx.arc(60, groundY - 95, 4, 0, Math.PI * 2);
    ctx.fill();
    // Steam
    for (let i = 0; i < 6; i++) {
      const sx = 40 + (i * 13 + frame * 0.2) % 40;
      const sy = groundY - 15 - (frame * 0.3 + i * 20) % 40;
      ctx.fillStyle = `rgba(200,200,200,${0.1 + Math.sin(frame * 0.04 + i) * 0.05})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawTree(ctx, x, y) {
  drawRect(ctx, x - 2, y, 4, 15, PAL.treeTrunk);
  ctx.fillStyle = PAL.treeLeaf;
  ctx.beginPath();
  ctx.arc(x, y - 5, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PAL.treeLeafDark;
  ctx.beginPath();
  ctx.arc(x - 3, y - 3, 8, 0, Math.PI * 2);
  ctx.fill();
}

function drawPineTree(ctx, x, y) {
  drawRect(ctx, x - 2, y, 4, 12, PAL.treeTrunk);
  for (let i = 0; i < 3; i++) {
    const ty = y - 5 - i * 10;
    const tw = 14 - i * 3;
    ctx.fillStyle = i === 2 ? '#106020' : '#187028';
    ctx.beginPath();
    ctx.moveTo(x - tw, ty);
    ctx.lineTo(x, ty - 12);
    ctx.lineTo(x + tw, ty);
    ctx.fill();
  }
}

function drawPalmTree(ctx, x, y) {
  drawRect(ctx, x - 2, y, 4, 25, '#8a6a30');
  const fronds = [[-20, -8], [-10, -12], [5, -10], [15, -6], [0, -14]];
  for (const [fx, fy] of fronds) {
    ctx.strokeStyle = '#30a030';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y - 3);
    ctx.quadraticCurveTo(x + fx * 0.5, y + fy - 10, x + fx, y + fy);
    ctx.stroke();
  }
}

function drawMagicTree(ctx, x, y) {
  drawRect(ctx, x - 3, y, 6, 18, '#4a306a');
  ctx.fillStyle = '#6030a0';
  ctx.beginPath();
  ctx.arc(x, y - 8, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8050c0';
  ctx.beginPath();
  ctx.arc(x + 3, y - 10, 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawRock(ctx, x, y) {
  ctx.fillStyle = '#606060';
  ctx.beginPath();
  ctx.ellipse(x, y, 8, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#707070';
  ctx.beginPath();
  ctx.ellipse(x - 1, y - 1, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();
}

// ===== CHARACTER =====
export function drawCharacter(ctx, x, y) {
  // Body
  drawRect(ctx, x - 6, y - 28, 12, 14, PAL.shirt);
  // Head
  drawRect(ctx, x - 5, y - 38, 10, 10, PAL.skin);
  // Hair
  drawRect(ctx, x - 5, y - 40, 10, 4, PAL.hair);
  // Eyes
  setPixel(ctx, x - 3, y - 34, PAL.black, 2);
  setPixel(ctx, x + 1, y - 34, PAL.black, 2);
  // Legs
  drawRect(ctx, x - 5, y - 14, 4, 14, PAL.pants);
  drawRect(ctx, x + 1, y - 14, 4, 14, PAL.pants);
  // Arms
  drawRect(ctx, x - 9, y - 28, 3, 10, PAL.skin);
  drawRect(ctx, x + 6, y - 28, 3, 10, PAL.skin);
  // Hat
  drawRect(ctx, x - 7, y - 42, 14, 3, '#d08040');
  drawRect(ctx, x - 4, y - 46, 8, 4, '#d08040');
}

// ===== FISHING ROD =====
export function drawFishingRod(ctx, charX, charY, castPower, phase) {
  const rodBaseX = charX + 8;
  const rodBaseY = charY - 24;

  if (phase === 'casting' || phase === 'waiting' || phase === 'bite') {
    const tipAngle = -0.3 - castPower * 0.5;
    const rodLen = 50;
    const tipX = rodBaseX + Math.cos(tipAngle) * rodLen;
    const tipY = rodBaseY + Math.sin(tipAngle) * rodLen;

    ctx.strokeStyle = PAL.wood;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rodBaseX, rodBaseY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    ctx.strokeStyle = PAL.string;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    const lineEndX = tipX + castPower * 80;
    ctx.lineTo(lineEndX, charY + 30);
    ctx.stroke();
  } else {
    const tipX = rodBaseX + 35;
    const tipY = rodBaseY - 25;
    ctx.strokeStyle = PAL.wood;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rodBaseX, rodBaseY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();
  }
}

// ===== BOBBER =====
export function drawBobber(ctx, x, y, frame, hasBite) {
  const bobY = y + Math.sin(frame * 0.1) * 2;
  if (hasBite) {
    const dip = Math.sin(frame * 0.5) * 5;
    drawRect(ctx, x - 2, bobY + dip, 4, 8, PAL.red);
    drawRect(ctx, x - 1, bobY + dip - 2, 2, 3, PAL.white);
  } else {
    drawRect(ctx, x - 2, bobY, 4, 8, PAL.red);
    drawRect(ctx, x - 1, bobY - 2, 2, 3, PAL.white);
  }
}

// ===== FISH SPRITE =====
export function createFishSprite(ctx, x, y, colors, size, frame) {
  const s = Math.max(0.5, size / 40);
  const tailWag = Math.sin(frame * 0.15) * 3 * s;

  // Tail
  ctx.fillStyle = colors.fin;
  ctx.beginPath();
  ctx.moveTo(x + 12 * s, y);
  ctx.lineTo(x + 20 * s, y - 6 * s + tailWag);
  ctx.lineTo(x + 20 * s, y + 6 * s + tailWag);
  ctx.fill();

  // Body
  ctx.fillStyle = colors.body;
  ctx.beginPath();
  ctx.ellipse(x, y, 12 * s, 7 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Belly
  ctx.fillStyle = colors.belly;
  ctx.beginPath();
  ctx.ellipse(x, y + 2 * s, 10 * s, 4 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = PAL.white;
  ctx.beginPath();
  ctx.arc(x - 6 * s, y - 2 * s, 2.5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PAL.black;
  ctx.beginPath();
  ctx.arc(x - 6 * s, y - 2 * s, 1.2 * s, 0, Math.PI * 2);
  ctx.fill();

  // Dorsal fin
  ctx.fillStyle = colors.fin;
  ctx.beginPath();
  ctx.moveTo(x - 4 * s, y - 6 * s);
  ctx.lineTo(x + 2 * s, y - 11 * s);
  ctx.lineTo(x + 6 * s, y - 6 * s);
  ctx.fill();
}

// ===== UNDERWATER FISH =====
export function drawUnderwaterFish(ctx, w, skyH, h, frame, locationId) {
  const fishPositions = [
    { x: 0.2, y: 0.65, size: 20, speed: 0.3 },
    { x: 0.5, y: 0.75, size: 15, speed: 0.5 },
    { x: 0.8, y: 0.60, size: 25, speed: 0.2 },
    { x: 0.35, y: 0.85, size: 18, speed: 0.4 },
  ];

  const fishColors = [
    { body: '#d04040', belly: '#e08080', fin: '#b03030' },
    { body: '#40b040', belly: '#80d080', fin: '#308030' },
    { body: '#d0a030', belly: '#e0c070', fin: '#b08020' },
    { body: '#6060d0', belly: '#9090e0', fin: '#4040b0' },
  ];

  for (let i = 0; i < fishPositions.length; i++) {
    const fp = fishPositions[i];
    const fx = ((fp.x * w + frame * fp.speed * (i % 2 ? 1 : -1)) % (w + 60)) - 30;
    const fy = skyH + (h - skyH) * (fp.y - 0.55) / 0.45;
    const alpha = 0.3 + (fp.y - 0.55) * 0.5;
    ctx.globalAlpha = alpha;
    createFishSprite(ctx, fx, fy, fishColors[i % fishColors.length], fp.size, frame);
    ctx.globalAlpha = 1;
  }
}
