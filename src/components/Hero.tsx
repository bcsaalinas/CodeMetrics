import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }
    )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' },
        '-=0.3'
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
  }, []);

  return (
    <section ref={sectionRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div
          ref={lineRef}
          className="w-20 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-blue mx-auto mb-8 origin-left"
        />
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] mb-6"
        >
          Code
          <br />
          <span className="bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple bg-clip-text text-transparent">
            Metrics
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-dark-200 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed"
        >
          A personal tracker of my coding journey. Visualizing progress,
          languages, and dedication — powered by WakaTime.
        </p>
      </div>
    </section>
  );
}
