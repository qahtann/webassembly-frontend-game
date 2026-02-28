# 🎮 WebAssembly Frontend Game

[![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-Rust-654FF0?logo=webassembly)](https://webassembly.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.169-000000?logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)

> A modern, production-ready interactive 3D particle simulation powered by **React 19**, **TypeScript**, **Three.js**, and **Rust WebAssembly** for high-performance computation.

## ✨ Features

- 🚀 **WebAssembly-Powered**: Heavy computation offloaded to Rust/WASM for optimal performance
- 🎨 **3D Visualization**: Beautiful Three.js-powered particle system with real-time rendering
- ⚡ **High Performance**: Simulate up to 50,000+ particles at 60 FPS
- 🎛️ **Interactive Controls**: Real-time parameter adjustment (particle count, gravity, attraction)
- 🌓 **Dark/Light Mode**: Seamless theme switching with persistent preferences
- 📱 **Fully Responsive**: Works beautifully on desktop, tablet, and mobile devices
- ♿ **Accessible**: ARIA labels, keyboard navigation, and semantic HTML
- 🧪 **Type-Safe**: Full TypeScript strict mode with comprehensive type coverage
- 🎯 **Modern Stack**: React 19, Vite 6, Tailwind CSS v4, shadcn/ui components

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) with Hooks
- **Build Tool**: [Vite 6](https://vitejs.dev/) with WASM plugin
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **3D Rendering**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **WebAssembly**: [Rust](https://www.rust-lang.org/) + [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

## 📸 Screenshots

![Particle Simulation](https://via.placeholder.com/800x450/0a0a0a/60a5fa?text=3D+Particle+Simulation)
*Interactive 3D particle system with real-time physics simulation*

![Controls Panel](https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Controls+Panel)
*Intuitive control panel with live performance metrics*

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Rust** and **Cargo** ([Install Rust](https://www.rust-lang.org/tools/install))
- **wasm-pack** ([Install wasm-pack](https://rustwasm.github.io/wasm-pack/installer/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/webassembly-frontend-game.git
   cd webassembly-frontend-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the WebAssembly module**
   ```bash
   npm run build-wasm
   ```
   This compiles the Rust code to WebAssembly and generates TypeScript bindings.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
# Build WASM module
npm run build-wasm

# Build the React app
npm run build
```

The production build will be in the `dist/` directory.

## 📁 Project Structure

```
webassembly-frontend-game/
├── rust/                    # Rust WASM crate
│   ├── src/
│   │   └── lib.rs          # Particle physics simulation
│   └── Cargo.toml
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   └── game/           # Game-specific components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities & WASM loader
│   ├── test/               # Test setup
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## 🎮 Usage

### Controls

- **Play/Pause**: Start or pause the particle simulation
- **Reset**: Reset all particles to their initial positions
- **Particle Count**: Adjust the number of particles (100 - 50,000)
- **Gravity**: Control gravitational force (-2.0 to 2.0)
- **Attraction Strength**: Adjust particle-to-center attraction (0.0 to 5.0)
- **Dark Mode Toggle**: Switch between light and dark themes

### Keyboard Shortcuts

- `Space`: Toggle play/pause
- `R`: Reset simulation
- `D`: Toggle dark mode

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## 🚢 Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Configure build settings:
   - **Build Command**: `npm run build-wasm && npm run build`
   - **Output Directory**: `dist`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Create a new site in [Netlify](https://netlify.com)
3. Add build settings in `netlify.toml`:
   ```toml
   [build]
     command = "npm run build-wasm && npm run build"
     publish = "dist"
   ```
4. Deploy!

### Important Notes

- **WASM Files**: Ensure WASM files are served with correct MIME types
- **CORS Headers**: The Vite config includes necessary CORS headers for WASM
- **Build WASM First**: Always run `npm run build-wasm` before building the app

## 🔧 Development

### Adding New Features

1. **WASM Functions**: Add new functions in `rust/src/lib.rs` and rebuild with `npm run build-wasm`
2. **React Components**: Add components in `src/components/`
3. **Hooks**: Create custom hooks in `src/hooks/`
4. **Styling**: Use Tailwind classes or extend the theme in `tailwind.config.js`

### Code Style

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Configured with React and TypeScript rules
- **Formatting**: Follow existing code style

## 📊 Performance

- **WASM vs JS**: Particle simulation runs ~3-5x faster in WASM
- **Optimizations**: 
  - Efficient memory management in Rust
  - Minimal allocations in hot paths
  - Optimized Three.js rendering
  - RequestAnimationFrame-based game loop

## 🙏 Acknowledgments

- [wasm-pack](https://rustwasm.github.io/wasm-pack/) for excellent WASM tooling
- [Three.js](https://threejs.org/) for powerful 3D graphics
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Vite](https://vitejs.dev/) for blazing-fast development experience

## 📧 Contact

- telegram: https://t.me/qahtan_n
- twitter:  https://x.com/qahtann_
