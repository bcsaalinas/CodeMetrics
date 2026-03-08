import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SummaryLanguage } from '../types/wakatime.ts';

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  '#06d6a0', '#118ab2', '#7b2ff7', '#ef476f', '#ffd166',
  '#4ecdc4', '#a855f7', '#f97316', '#06b6d4', '#ec4899',
  '#84cc16', '#f43f5e',
];

interface LanguageChartProps {
  languages: SummaryLanguage[];
}

export default function LanguageChart({ languages }: LanguageChartProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const top = languages.slice(0, 10);

  useEffect(() => {
    if (!sectionRef.current || !barsRef.current || !headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    const bars = barsRef.current.querySelectorAll('[data-bar]');
    bars.forEach((bar, i) => {
      const inner = bar.querySelector('[data-bar-fill]') as HTMLElement;
      const label = bar.querySelector('[data-bar-label]');
      const pct = bar.querySelector('[data-bar-pct]');

      gsap.fromTo(
        bar,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      if (inner) {
        gsap.fromTo(
          inner,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: 0.3 + i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (label) {
        gsap.fromTo(label, { opacity: 0 }, {
          opacity: 1,
          duration: 0.5,
          delay: 0.5 + i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }

      if (pct) {
        gsap.fromTo(pct, { opacity: 0 }, {
          opacity: 1,
          duration: 0.5,
          delay: 0.5 + i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }
    });
  }, [top]);

  return (
    <section ref={sectionRef} className="px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="flex items-center gap-4 mb-10">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-accent-cyan to-accent-blue" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Language Breakdown
          </h2>
          <span className="text-dark-300 text-sm font-mono ml-auto">
            this month
          </span>
        </div>

        <div
          ref={barsRef}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 space-y-5"
        >
          {top.map((lang, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <div key={lang.name} data-bar className="group">
                <div className="flex items-center justify-between mb-2">
                  <span
                    data-bar-label
                    className="text-white text-sm font-medium flex items-center gap-2"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: color }}
                    />
                    {lang.name}
                  </span>
                  <span
                    data-bar-pct
                    className="text-dark-200 text-xs font-mono"
                  >
                    {lang.percent.toFixed(1)}% · {lang.text}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    data-bar-fill
                    className="h-full rounded-full origin-left transition-shadow duration-300 group-hover:shadow-lg"
                    style={{
                      width: `${Math.max(lang.percent, 0.5)}%`,
                      backgroundColor: color,
                      boxShadow: `0 0 12px ${color}40`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
