import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    // Subtle glow fade in
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
      0
    );

    // Dot grid fades in
    tl.fromTo(
      gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' },
      0.2
    );

    // Tag label slides in
    tl.fromTo(
      tagRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      0.3
    );

    // First line — clip from bottom
    tl.fromTo(
      titleLine1Ref.current,
      { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' },
      0.5
    );

    // Second line — clip from bottom, slightly delayed
    tl.fromTo(
      titleLine2Ref.current,
      { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' },
      0.65
    );

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      1.0
    );
  }, []);

  return (
    <section ref={sectionRef} className="pt-36 pb-28 px-6 relative overflow-hidden">
      {/* Dot grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Single subtle glow — not a generic orb */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Tag */}
        <span
          ref={tagRef}
          className="inline-flex items-center gap-2 mb-8 text-xs font-mono tracking-[0.2em] uppercase text-dark-200 opacity-0"
        >
          <span className="w-5 h-px bg-accent-cyan/50" />
          developer dashboard
        </span>

        {/* Title — left-aligned, editorial feel */}
        <h1 className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter text-white leading-[0.88] mb-8">
          <span ref={titleLine1Ref} className="block opacity-0">
            Code
          </span>
          <span ref={titleLine2Ref} className="block opacity-0">
            <span className="bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-sky bg-clip-text text-transparent">
              Metrics
            </span>
            <span className="text-dark-300">.</span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-dark-200 text-base md:text-lg max-w-md font-light leading-relaxed opacity-0"
        >
          Tracking my coding journey — visualizing progress, languages,
          and time spent building, powered by WakaTime.
        </p>
      </div>
    </section>
  );
}
