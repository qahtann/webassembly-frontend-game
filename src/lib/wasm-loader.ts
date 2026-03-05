import init, { ParticleSystem } from './wasm-pkg/particle_sim_wasm';

let wasmInitialized = false;
let initPromise: Promise<void> | null = null;

export async function loadWasm(): Promise<void> {
  if (wasmInitialized) {
    return Promise.resolve();
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = init().then(() => {
    wasmInitialized = true;
  });

  return initPromise;
}

export { ParticleSystem };
export type { ParticleSystem as ParticleSystemType };
