import { useState, useEffect, useRef } from 'react';

export function useFPS(): number {
  const [fps, setFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - lastTimeRef.current) / 1000;
      const currentFps = Math.round(frameCountRef.current / elapsed);
      setFps(currentFps);
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    frameCountRef.current++;
  });

  return fps;
}
