import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.children;

    gsap.to(bars, {
      scaleY: 1.8,
      stagger: 0.15,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 0.4,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-500"
    >
      <div ref={barsRef} className="flex items-end gap-1.5 h-10 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-6 rounded-full"
            style={{
              background: `linear-gradient(180deg, #06d6a0, #118ab2)`,
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
      <p className="text-dark-200 text-sm font-mono tracking-wider uppercase">
        Loading metrics...
      </p>
    </div>
  );
}
