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

  useEffect(() => {
    if (!sectionRef.current || !graphRef.current || !headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );

    const bars = graphRef.current.querySelectorAll('[data-activity-bar]');
    bars.forEach((bar, i) => {
      gsap.fromTo(
        bar,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          delay: i * 0.03,
          ease: 'back.out(1.7)',
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

  return (
    <section ref={sectionRef} className="px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="flex items-center gap-4 mb-10">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-accent-purple to-accent-pink" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Daily Activity
          </h2>
          <span className="text-dark-300 text-sm font-mono ml-auto">
            this month
          </span>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8">
          <div
            ref={graphRef}
            className="flex items-end gap-1.5 h-48 md:h-64"
          >
            {dailyData.map((day) => {
              const heightPct = (day.seconds / maxSeconds) * 100;
              const intensity = day.seconds / maxSeconds;

              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center group relative"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-dark-600 border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {formatDate(day.date)}
                    <br />
                    {formatHours(day.seconds)}
                  </div>
                  <div
                    data-activity-bar
                    className="w-full rounded-t-sm origin-bottom cursor-pointer transition-all duration-200 group-hover:brightness-125"
                    style={{
                      height: `${Math.max(heightPct, 2)}%`,
                      background: `linear-gradient(180deg,
                        rgba(123, 47, 247, ${0.4 + intensity * 0.6}),
                        rgba(6, 214, 160, ${0.3 + intensity * 0.7}))`,
                      minHeight: '4px',
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-4 text-dark-300 text-xs font-mono">
            <span>{dailyData.length > 0 ? formatDate(dailyData[0].date) : ''}</span>
            <span>{dailyData.length > 0 ? formatDate(dailyData[dailyData.length - 1].date) : ''}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
