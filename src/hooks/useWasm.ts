import { useState, useEffect } from 'react';
import { loadWasm, ParticleSystem } from '@/lib/wasm-loader';

interface UseWasmReturn {
  wasmLoaded: boolean;
  error: Error | null;
  createParticleSystem: (numParticles: number, bounds: number, damping: number) => ParticleSystem | null;
}

export function useWasm(): UseWasmReturn {
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadWasm()
      .then(() => {
        setWasmLoaded(true);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Failed to load WASM'));
        setWasmLoaded(false);
      });
  }, []);

  const createParticleSystem = (
    numParticles: number,
    bounds: number,
    damping: number
  ): ParticleSystem | null => {
    if (!wasmLoaded) {
      return null;
    }

    try {
      return new ParticleSystem(numParticles, bounds, damping);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create particle system'));
      return null;
    }
  };

  return { wasmLoaded, error, createParticleSystem };
}
