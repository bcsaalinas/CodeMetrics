import { useWakatime } from './hooks/useWakatime.ts';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import StatsSection from './components/StatsSection.tsx';
import LanguageChart from './components/LanguageChart.tsx';
import ActivityGraph from './components/ActivityGraph.tsx';
import WakaTimeEmbed from './components/WakaTimeEmbed.tsx';
import Footer from './components/Footer.tsx';
import Loader from './components/Loader.tsx';

export default function App() {
  const { data, loading, error } = useWakatime();

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-pink/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef476f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Failed to load data</h2>
          <p className="text-dark-200 text-sm max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-dark-500 text-white">
      <Navbar />
      <Hero />
      <StatsSection data={data} />
      <LanguageChart languages={data.languages} />
      <ActivityGraph dailyData={data.dailyData} />
      <WakaTimeEmbed />
      <Footer />
    </div>
  );
}
