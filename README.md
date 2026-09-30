# Liquid Glass Tic-Tac-Toe • iOS Edition 🧊✨

A responsive, high-aesthetic Tic-Tac-Toe game featuring **authentic Apple iOS/visionOS liquid glassmorphism**, fluid spring physics, dynamic mesh wallpaper, and acoustic sound synthesis.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/raaaktim/tictactoe)

---

## 🌟 Key Features

- **iOS Liquid Glassmorphism**:
  - Multi-layer frosted acrylic surfaces (`backdrop-filter: blur(32px)`).
  - Directional specular glare reflections and beveled squircle borders.
  - Interactive 3D perspective parallax tilt on mouse/touch move.
- **Dynamic Fluid Mesh Wallpaper**:
  - Shifting ambient liquid gradient mesh responding smoothly to cursor position.
- **Dual Section Architecture**:
  - **4 × 4 Section**: 16 tiles, connect 4 in a row to win. Fast tactical skirmishes.
  - **6 × 6 Section**: 36 tiles, connect 4 in a row to win across 54 intersecting lines. Deep strategic combat with double-threat fork setups.
- **Game Modes**:
  - **Local 2-Player (Pass & Play)**: Shared screen play with turn auras and independent section scoreboards.
  - **Local vs Liquid AI**: Unbeatable depth-limited **Smart AI** (Alpha-Beta Minimax) and accessible **Casual AI** with natural human-like thinking delays.
- **Synthesized iOS Acoustics**:
  - Zero external sound files — pure Web Audio API engine producing snappy taptic UI clicks, crystalline glass pings, droplet bloops, and victory arpeggios.
  - Device vibration haptic feedback (`navigator.vibrate`).
- **VisionOS Victory Modal**:
  - Liquid droplet particle confetti bursts and rematch controls.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
git clone https://github.com/raaaktim/tictactoe.git
cd tictactoe
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## ☁️ Deploy to Vercel

This repository is pre-configured and 100% Vercel-ready with [`vercel.json`](./vercel.json).

1. Import this repository in [Vercel](https://vercel.com).
2. Framework Preset: **Vite** (auto-detected).
3. Click **Deploy**!
