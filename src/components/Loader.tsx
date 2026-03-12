import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bracketLeftRef = useRef<HTMLSpanElement>(null);
  const bracketRightRef = useRef<HTMLSpanElement>(null);
  const slashRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // Brackets breathe in and out
    tl.to([bracketLeftRef.current, bracketRightRef.current], {
      scaleX: 1.15,
      duration: 0.8,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    })
      .to(
        slashRef.current,
        {
          rotation: 360,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        0
      );

    // Pulsing dot on the text
    gsap.to(dotRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: 'power1.inOut',
    });

    // Fade in the whole thing
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-500"
    >
      <div className="flex items-center gap-0 mb-8 text-5xl font-mono font-light select-none">
        <span
          ref={bracketLeftRef}
          className="text-accent-cyan/70 inline-block origin-right"
        >
          {'<'}
        </span>
        <span
          ref={slashRef}
          className="text-dark-200/60 inline-block mx-0.5"
        >
          /
        </span>
        <span
          ref={bracketRightRef}
          className="text-accent-cyan/70 inline-block origin-left"
        >
          {'>'}
        </span>
      </div>
      <p
        ref={textRef}
        className="text-dark-200 text-xs font-mono tracking-[0.25em] uppercase"
      >
        loading<span ref={dotRef} className="text-accent-cyan">_</span>
      </p>
    </div>
  );
}
