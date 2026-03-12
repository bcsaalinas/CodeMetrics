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
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      );
    }

    if (embedRef.current) {
      gsap.fromTo(
        embedRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }
  }, []);

  if (!userId || !chartId) return null;

  return (
    <section ref={sectionRef} className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="section-accent bg-gradient-to-r from-accent-orange to-accent-pink" />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              All-Time Languages
            </h2>
          </div>
          <p className="text-dark-300 text-xs font-mono tracking-wide ml-11">
            lifetime
          </p>
        </div>

        <div
          ref={embedRef}
          className="card-surface p-5 md:p-7"
        >
          <div className="w-full overflow-hidden rounded-xl bg-dark-600/30 p-3 flex items-center justify-center min-h-[400px]">
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
