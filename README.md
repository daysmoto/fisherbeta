# 🎣 Pixel Fisher — Game Memancing Pixel Art

Game memancing pixel art lengkap dengan banyak fitur. Desktop-optimized.
Terintegrasi opsional dengan [Xiaomi MiMo Orbit 100T Program](https://100t.xiaomimimo.com/).

**BETA 0.0.1 — Still in Development**

## 🌐 Live Demo

**[Mainkan di sini → dist-yzhalwzh.devinapps.com](https://dist-yzhalwzh.devinapps.com)**

## ✨ Fitur Utama

### 🐟 59 Spesies Ikan dengan Tingkat Kesulitan
- **15 ikan** di Peaceful Lake (difficulty 1-9)
- **12 ikan** di Mountain River (difficulty 1-10)
- **12 ikan** di Deep Ocean (difficulty 2-10)
- **10 ikan** di Enchanted Pond (difficulty 1-10)
- **10 ikan** di Volcanic Hotspring (difficulty 1-10)
- **5 rarity tier**: Common ⭐, Uncommon ⭐⭐, Rare ⭐⭐⭐, Epic ⭐⭐⭐⭐, Legendary ⭐⭐⭐⭐⭐
- **Difficulty 1-10** per ikan: Easy (1-2), Medium (3-4), Hard (5-6), Very Hard (7-8), EXTREME (9-10)

### 🎮 Gameplay
- **Mekanik memancing**: Cast (power bar) → Tunggu → Bite → Reel Mini-Game (kontrol tension berdasarkan difficulty ikan)
- **Semakin sulit ikannya**, semakin agresif dan cepat gerakannya saat reel
- **Equipment system**: 6 fishing rod, 7 bait, 6 aksesori
- **Progression**: XP/leveling, gold economy, unlock lokasi baru
- **27 achievement**: First Catch, Master Angler, Storm Chaser, The Big One, dll.
- **Encyclopedia ikan**: Tracking semua 59 spesies

### 🎨 Visual
- **Pixel art 48px** dengan Canvas API rendering
- Animasi: air bergelombang, langit berubah, awan bergerak, cuaca (hujan/badai)
- Siklus waktu (siang/malam)
- 4 jenis cuaca: Sunny, Cloudy, Rainy, Stormy

### 💾 Save System
- Auto-save setiap 30 detik ke localStorage
- Manual save/load
- New game option

### 🤖 MiMo AI Companion (Opsional)
- Integrasi dengan **Xiaomi MiMo V2.5 Pro**
- AI fishing companion yang memberi tips, cerita, dan saran bait
- Masukkan API key di **Settings** → aktif!
- Dapatkan token gratis di [100t.xiaomimimo.com](https://100t.xiaomimimo.com/)

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+
- npm

### Install & Run
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

File `dist/` bisa di-deploy ke hosting statis manapun.

## 📁 Struktur Project

```
src/
├── App.jsx                     # Main game orchestrator
├── main.jsx                    # Entry point
├── index.css                   # Global styles (Tailwind)
├── engine/
│   ├── sprites.js              # Pixel art rendering (Canvas API)
│   ├── fishData.js             # 59 spesies ikan + difficulty
│   ├── locationData.js         # 5 lokasi memancing
│   ├── equipmentData.js        # Rod, bait, accessories
│   ├── achievementData.js      # 27 achievements
│   └── gameState.js            # State management, save/load
└── components/
    ├── FishingCanvas.jsx       # Canvas game renderer
    ├── FishingHUD.jsx          # Stats sidebar (desktop)
    ├── FishingMenu.jsx         # Title screen
    ├── ReelMiniGame.jsx        # Reel tension mini-game
    ├── FishingCatchModal.jsx   # Catch/lost result
    ├── FishingShop.jsx         # Equipment shop
    ├── FishingInventory.jsx    # Fish bag
    ├── FishingEncyclopedia.jsx # Fish database + difficulty info
    ├── FishingAchievements.jsx # Achievement tracker
    ├── FishingMap.jsx          # Location selection
    ├── FishingSettings.jsx     # Settings + MiMo API key
    └── MiMoCompanion.jsx       # AI chat companion
```

## 🎯 Cara Bermain

1. Klik **"Start Fishing"** di menu
2. **Cast**: Klik/tekan Space untuk mulai cast → klik lagi untuk release
3. **Tunggu**: Ikan akan datang setelah beberapa detik
4. **Bite**: Saat ada tanda "! BITE !", segera klik/tekan Space!
5. **Reel**: Tahan klik/Space untuk reel — jaga tension di zona hijau
   - Ikan difficulty rendah = mudah dikontrol
   - Ikan difficulty tinggi = sangat agresif!
6. **Hasil**: Ikan tertangkap → simpan atau jual
7. **Upgrade**: Beli rod/bait/aksesori baru di Shop
8. **Explore**: Unlock lokasi baru saat level naik

## 📊 Tech Stack
- React 19 + Vite
- Canvas API (pixel art rendering)
- Tailwind CSS (styling)
- localStorage (save system)

## 🏆 Credits
- Built for [Xiaomi MiMo Orbit 100T Creator Incentive Program](https://100t.xiaomimimo.com/)
- AI powered by Xiaomi MiMo V2.5 Pro

## 📝 License
MIT
