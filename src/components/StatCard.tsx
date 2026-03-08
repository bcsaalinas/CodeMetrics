import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  label: string;
  value: string;
  gradient: string;
  icon: React.ReactNode;
  index: number;
}

export default function StatCard({ label, value, gradient, icon, index }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="group relative">
      {/* Glow effect */}
      <div
        className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${gradient}`}
      />
      <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] transition-all duration-500 h-full">
        <div className="flex items-start justify-between mb-6">
          <span className="text-dark-200 text-sm font-medium uppercase tracking-widest">
            {label}
          </span>
          <div className={`w-10 h-10 rounded-xl ${gradient} flex items-center justify-center opacity-80`}>
            {icon}
          </div>
        </div>
        <p className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
