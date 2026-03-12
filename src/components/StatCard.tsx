import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  label: string;
  value: string;
  accentColor: string;
  icon: React.ReactNode;
  index: number;
}

export default function StatCard({ label, value, accentColor, icon, index }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative card-surface p-6 md:p-7 overflow-hidden"
    >
      {/* Left accent border */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full transition-all duration-500 group-hover:top-2 group-hover:bottom-2"
        style={{ backgroundColor: accentColor, opacity: 0.5 }}
      />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-dark-200 opacity-50" style={{ color: accentColor }}>
          {icon}
        </span>
        <span className="text-dark-200 text-[11px] font-mono uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>
      <p className="text-2xl md:text-3xl font-semibold text-white font-mono tracking-tight pl-0.5">
        {value}
      </p>
    </div>
  );
}
