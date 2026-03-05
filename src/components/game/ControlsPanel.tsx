import { Play, Pause, RotateCcw, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/hooks/useTheme';

interface ControlsPanelProps {
  isRunning: boolean;
  onToggleRunning: () => void;
  onReset: () => void;
  particleCount: number;
  onParticleCountChange: (value: number) => void;
  gravity: number;
  onGravityChange: (value: number) => void;
  attractionStrength: number;
  onAttractionStrengthChange: (value: number) => void;
  fps: number;
}

export function ControlsPanel({
  isRunning,
  onToggleRunning,
  onReset,
  particleCount,
  onParticleCountChange,
  gravity,
  onGravityChange,
  attractionStrength,
  onAttractionStrengthChange,
  fps,
}: ControlsPanelProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Controls</CardTitle>
            <Toggle
              pressed={theme === 'dark'}
              onPressedChange={toggleTheme}
              aria-label="Toggle dark mode"
              className="h-9 w-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Toggle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Button
              onClick={onToggleRunning}
              variant="default"
              className="flex-1"
              aria-label={isRunning ? 'Pause simulation' : 'Start simulation'}
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </>
              )}
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              aria-label="Reset simulation"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="particle-count" className="font-medium">
                Particle Count
              </label>
              <span className="text-muted-foreground">{particleCount}</span>
            </div>
            <Slider
              id="particle-count"
              min={100}
              max={50000}
              step={100}
              value={particleCount}
              onValueChange={onParticleCountChange}
              aria-label="Particle count"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="gravity" className="font-medium">
                Gravity
              </label>
              <span className="text-muted-foreground">{gravity.toFixed(2)}</span>
            </div>
            <Slider
              id="gravity"
              min={-2}
              max={2}
              step={0.1}
              value={gravity}
              onValueChange={onGravityChange}
              aria-label="Gravity strength"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="attraction" className="font-medium">
                Attraction Strength
              </label>
              <span className="text-muted-foreground">{attractionStrength.toFixed(2)}</span>
            </div>
            <Slider
              id="attraction"
              min={0}
              max={5}
              step={0.1}
              value={attractionStrength}
              onValueChange={onAttractionStrengthChange}
              aria-label="Attraction strength"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>Real-time statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">FPS</span>
              <span className="font-mono font-semibold">{fps}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Particles</span>
              <span className="font-mono">{particleCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Compute</span>
              <span className="font-mono text-green-600 dark:text-green-400">WASM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
