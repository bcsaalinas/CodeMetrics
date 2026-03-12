import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SummaryLanguage } from '../types/wakatime.ts';

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#38bdf8', '#7c3aed',
  '#34d399', '#818cf8', '#fbbf24', '#2dd4bf', '#a78bfa',
  '#6ee7b7', '#93c5fd',
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
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
      }
    );

    const bars = barsRef.current.querySelectorAll('[data-bar]');
    bars.forEach((bar, i) => {
      const inner = bar.querySelector('[data-bar-fill]') as HTMLElement;

      gsap.fromTo(
        bar,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: i * 0.06,
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
            duration: 0.9,
            delay: 0.2 + i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    });
  }, [top]);

  return (
    <section ref={sectionRef} className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="section-accent bg-gradient-to-r from-accent-cyan to-accent-blue" />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Languages
            </h2>
          </div>
          <p className="text-dark-300 text-xs font-mono tracking-wide ml-11">
            this month
          </p>
        </div>

        <div
          ref={barsRef}
          className="card-surface p-6 md:p-8 space-y-4"
        >
          {top.map((lang, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <div key={lang.name} data-bar className="group flex items-center gap-4">
                {/* Rank number */}
                <span className="text-dark-300 text-[11px] font-mono w-5 text-right shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-sm inline-block shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      {lang.name}
                    </span>
                    <span className="text-dark-200 text-[11px] font-mono tabular-nums">
                      {lang.percent.toFixed(1)}%
                      <span className="text-dark-300 ml-1.5">{lang.text}</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      data-bar-fill
                      className="h-full rounded-full origin-left transition-all duration-300"
                      style={{
                        width: `${Math.max(lang.percent, 0.5)}%`,
                        backgroundColor: color,
                        opacity: 0.8,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
