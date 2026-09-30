# Liquid Glass Tic-Tac-Toe • iOS Edition 🧊✨

A responsive, high-aesthetic Tic-Tac-Toe game featuring **authentic Apple iOS/visionOS liquid glassmorphism**, fluid spring physics, dynamic mesh wallpaper, and acoustic sound synthesis.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/raaaktim/tictactoe)

---

## 📖 Rules & How to Win

### 🏆 6 × 6 Master Section Rules
In the **6 × 6 Section** (36 tiles), the objective is to **connect 4 of your marks in an unbroken line** before your opponent does.

#### 54 Intersecting Winning Pathways:
| Alignment | Winning Lines | Description |
|---|:---:|---|
| **Horizontal (Rows)** | **18 lines** | 3 four-tile segments across each of the 6 rows (`[1–4]`, `[2–5]`, `[3–6]`). |
| **Vertical (Columns)** | **18 lines** | 3 four-tile segments across each of the 6 columns. |
| **Diagonal `\`** | **9 lines** | 4-tile spans running top-left to bottom-right. |
| **Diagonal `/`** | **9 lines** | 4-tile spans running top-right to bottom-left. |
| **Total Pathways** | **54 lines** | **54 dynamic ways to secure victory!** |

#### Pro Tactics for 6 × 6:
1. **The "Open-Ended 3" (Unblockable Win)**: Place 3 marks in a line with both sides open (`_ X X X _`). Your opponent can only block one side, guaranteeing your victory on the next turn.
2. **Double-Threat Forks**: Position a mark that simultaneously completes two distinct 3-in-a-row threats in different directions.
3. **Golden Center Control**: The central 4 cells `[Row 3 & 4, Col 3 & 4]` intersect the highest density of diagonals, rows, and columns.

---

### ⚡ 4 × 4 Classic Section Rules
In the **4 × 4 Section** (16 tiles), the goal is to **complete a full line of 4 marks from edge to edge**.

#### 10 Winning Lines:
- **4 Rows**: Full horizontal lines across rows 1, 2, 3, and 4.
- **4 Columns**: Full vertical lines across columns 1, 2, 3, and 4.
- **2 Diagonals**: Corner-to-corner diagonal lines.

#### Strategy for 4 × 4:
- Control the inner quad `[5, 6, 9, 10]` early to restrict your opponent's diagonal and lateral paths.
- Block 3-in-a-row setups immediately before the line is closed.

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
  - **6 × 6 Section**: 36 tiles, connect 4 in a row across 54 intersecting lines.
- **In-App Rules Modal**:
  - Dedicated iOS visionOS frosted guide sheet accessible anytime during gameplay.
- **Game Modes**:
  - **Local 2-Player (Pass & Play)**: Shared screen play with turn auras and independent section scoreboards.
  - **Local vs Liquid AI**: Unbeatable depth-limited **Smart AI** (Alpha-Beta Minimax) and accessible **Casual AI**.
- **Synthesized iOS Acoustics**:
  - Zero external sound files — Web Audio API engine producing snappy taptic UI clicks, crystalline glass pings, droplet bloops, and victory arpeggios.
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
