/// <reference types="vite/client" />

declare module '@/lib/wasm-pkg/particle_sim_wasm' {
  export interface ParticleSystem {
    simulate(deltaTime: number, gravity: number, attractionStrength: number): void;
    get_positions(): number[];
    reset(): void;
    set_particle_count(count: number): void;
  }

  export default function init(): Promise<void>;
  export { ParticleSystem };
}
