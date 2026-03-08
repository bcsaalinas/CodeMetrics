import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WakaTimeEmbed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  const userId = import.meta.env.VITE_WAKATIME_USER_ID as string;
  const chartId = import.meta.env.VITE_WAKATIME_CHART_ID as string;

  useEffect(() => {
    if (!sectionRef.current) return;

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }

    if (embedRef.current) {
      gsap.fromTo(
        embedRef.current,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }
  }, []);

  if (!userId || !chartId) return null;

  return (
    <section ref={sectionRef} className="px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="flex items-center gap-4 mb-10">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-accent-orange to-accent-pink" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            All-Time Languages
          </h2>
          <span className="text-dark-300 text-sm font-mono ml-auto">
            lifetime
          </span>
        </div>

        <div
          ref={embedRef}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 md:p-8"
        >
          <div className="w-full overflow-hidden rounded-xl bg-dark-500/50 p-4 flex items-center justify-center min-h-[400px]">
            <embed
              className="w-full h-[400px] md:h-[500px]"
              src={`https://wakatime.com/share/@${userId}/${chartId}.svg`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
