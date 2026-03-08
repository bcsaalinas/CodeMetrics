import type { CodingStats } from '../types/wakatime.ts';
import StatCard from './StatCard.tsx';

interface StatsSectionProps {
  data: CodingStats;
}

export default function StatsSection({ data }: StatsSectionProps) {
  const stats = [
    {
      label: 'Total Time Coding',
      value: data.totalTime,
      gradient: 'bg-gradient-to-br from-accent-cyan to-accent-blue',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: 'Daily Average',
      value: data.dailyAverage,
      gradient: 'bg-gradient-to-br from-accent-purple to-accent-pink',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      label: 'Top Language',
      value: data.languages[0]?.name ?? 'N/A',
      gradient: 'bg-gradient-to-br from-accent-orange to-accent-pink',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      label: 'Languages Used',
      value: data.languages.length.toString(),
      gradient: 'bg-gradient-to-br from-accent-blue to-accent-purple',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
  ];

  return (
    <section className="px-6 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>
    </section>
  );
}
