import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ActivityGraphProps {
  dailyData: { date: string; seconds: number }[];
}

export default function ActivityGraph({ dailyData }: ActivityGraphProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  const maxSeconds = Math.max(...dailyData.map((d) => d.seconds), 1);
  const minSeconds = Math.min(...dailyData.map((d) => d.seconds), 0);
  const spreadSeconds = Math.max(maxSeconds - minSeconds, 1);
  const maxHours = Math.ceil(maxSeconds / 3600);
  const gridLines = Array.from({ length: 4 }, (_, i) => ((i + 1) / 4) * maxHours);

  useEffect(() => {
    if (!sectionRef.current || !graphRef.current || !headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      }
    );

    const bars = graphRef.current.querySelectorAll('[data-activity-bar]');
    bars.forEach((bar, i) => {
      gsap.fromTo(
        bar,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.5,
          delay: i * 0.02,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    });
  }, [dailyData]);

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function formatHours(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  }

  function formatShortDate(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { day: 'numeric' });
  }

  return (
    <section ref={sectionRef} className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="section-accent bg-gradient-to-r from-accent-purple to-accent-pink" />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Activity
            </h2>
          </div>
          <p className="text-dark-300 text-xs font-mono tracking-wide ml-11">
            this month
          </p>
        </div>

        <div className="card-surface p-6 md:p-8">
          {/* Graph area with Y-axis labels */}
          <div className="flex gap-3">
            {/* Y-axis */}
            <div className="flex flex-col justify-between h-48 md:h-56 py-0.5 shrink-0">
              {gridLines.reverse().map((h) => (
                <span key={h} className="text-dark-300 text-[10px] font-mono tabular-nums text-right w-6">
                  {Math.round(h)}h
                </span>
              ))}
            </div>

            {/* Graph */}
            <div className="flex-1 relative">
              {/* Horizontal grid lines */}
              {[0.25, 0.5, 0.75, 1].map((pct) => (
                <div
                  key={pct}
                  className="absolute left-0 right-0 border-t border-white/[0.04]"
                  style={{ bottom: `${pct * 100}%` }}
                />
              ))}

              <div
                ref={graphRef}
                className="flex items-end gap-[2px] md:gap-1 h-48 md:h-56 relative z-10"
              >
                {dailyData.map((day) => {
                  const normalized = (day.seconds - minSeconds) / spreadSeconds;
                  const heightPct = day.seconds > 0 ? Math.max(normalized * 100, 4) : 1.5;
                  const intensity = day.seconds / maxSeconds;

                  return (
                    <div
                      key={day.date}
                      className="flex-1 h-full flex flex-col justify-end items-center group relative"
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-dark-700 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-[11px] text-white font-mono opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100 whitespace-nowrap pointer-events-none z-20 shadow-xl shadow-black/40">
                        <span className="text-dark-100 block">{formatDate(day.date)}</span>
                        <span className="text-accent-cyan">{formatHours(day.seconds)}</span>
                      </div>
                      <div
                        data-activity-bar
                        className="w-full rounded-sm md:rounded-md origin-bottom cursor-pointer transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5"
                        style={{
                          height: `${heightPct}%`,
                          background: `linear-gradient(180deg, rgba(99, 102, 241, ${0.55 + intensity * 0.35}) 0%, rgba(99, 102, 241, ${0.2 + intensity * 0.45}) 100%)`,
                          boxShadow: `0 0 ${6 + intensity * 16}px rgba(99, 102, 241, ${0.08 + intensity * 0.2})`,
                          minHeight: '3px',
                          opacity: 0.88,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* X-axis dates */}
          <div className="flex justify-between mt-3 ml-9 text-dark-300 text-[10px] font-mono">
            {dailyData.length > 0 && dailyData.filter((_, i) => i % Math.ceil(dailyData.length / 6) === 0 || i === dailyData.length - 1).map((day) => (
              <span key={day.date}>{formatShortDate(day.date)}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
