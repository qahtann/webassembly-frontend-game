import { useState, useEffect, useCallback } from 'react';
import { useWasm } from '@/hooks/useWasm';
import { useFPS } from '@/hooks/useFPS';
import { CanvasWrapper } from '@/components/game/CanvasWrapper';
import { ControlsPanel } from '@/components/game/ControlsPanel';
import { LoadingSpinner } from '@/components/game/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const INITIAL_PARTICLE_COUNT = 5000;
const BOUNDS = 3.0;
const DAMPING = 0.98;

function App() {
  const { wasmLoaded, error, createParticleSystem } = useWasm();
  const fps = useFPS();
  const [particleSystem, setParticleSystem] = useState<ReturnType<typeof createParticleSystem>>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [particleCount, setParticleCount] = useState(INITIAL_PARTICLE_COUNT);
  const [gravity, setGravity] = useState(0.5);
  const [attractionStrength, setAttractionStrength] = useState(0.5);

  // Initialize particle system when WASM loads
  useEffect(() => {
    if (wasmLoaded && !particleSystem) {
      const system = createParticleSystem(INITIAL_PARTICLE_COUNT, BOUNDS, DAMPING);
      setParticleSystem(system);
    }
  }, [wasmLoaded, particleSystem, createParticleSystem]);

  // Update particle count in system
  useEffect(() => {
    if (particleSystem) {
      particleSystem.set_particle_count(particleCount);
    }
  }, [particleCount, particleSystem]);

  const handleReset = useCallback(() => {
    if (particleSystem) {
      particleSystem.reset();
    }
  }, [particleSystem]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement) {
        return; // Ignore if typing in input
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          setIsRunning((prev) => !prev);
          break;
        case 'r':
          handleReset();
          break;
        case 'd':
          // Theme toggle is handled by ControlsPanel
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleReset]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Error Loading WASM
            </CardTitle>
            <CardDescription>
              Failed to load the WebAssembly module. Please ensure you have built the WASM module.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Run <code className="px-2 py-1 bg-muted rounded">npm run build-wasm</code> to build the module.
            </p>
            <p className="text-xs text-muted-foreground">
              Error: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!wasmLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-2">WebAssembly Particle Simulation</h1>
          <p className="text-muted-foreground">
            Interactive 3D particle system powered by Rust WebAssembly for high-performance computation
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <CanvasWrapper
                  particleSystem={particleSystem}
                  isRunning={isRunning}
                  gravity={gravity}
                  attractionStrength={attractionStrength}
                  particleCount={particleCount}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <ControlsPanel
              isRunning={isRunning}
              onToggleRunning={() => setIsRunning(!isRunning)}
              onReset={handleReset}
              particleCount={particleCount}
              onParticleCountChange={setParticleCount}
              gravity={gravity}
              onGravityChange={setGravity}
              attractionStrength={attractionStrength}
              onAttractionStrengthChange={setAttractionStrength}
              fps={fps}
            />
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Built with React 19, TypeScript, Three.js, Rust, and WebAssembly
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
