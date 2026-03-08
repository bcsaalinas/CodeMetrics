import type { AllTimeSinceToday, SummaryResponse, CodingStats } from '../types/wakatime.ts';

const BASE_URL = '/api/wakatime';

async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`WakaTime API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getAllTimeSinceToday(): Promise<AllTimeSinceToday> {
  const result = await apiFetch<{ data: AllTimeSinceToday }>(
    'users/current/all_time_since_today'
  );
  return result.data;
}

export async function getSummary(): Promise<SummaryResponse> {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const startDate = `${year}-${month}-01`;
  const endDate = date.toISOString().slice(0, 10);

  return apiFetch<SummaryResponse>(
    `users/current/summaries?start=${startDate}&end=${endDate}`
  );
}

export async function getCodingStats(): Promise<CodingStats> {
  const [allTime, summary] = await Promise.all([
    getAllTimeSinceToday(),
    getSummary(),
  ]);

  // Aggregate languages across all days
  const langMap = new Map<string, { seconds: number; name: string }>();
  for (const day of summary.data) {
    for (const lang of day.languages) {
      const existing = langMap.get(lang.name);
      if (existing) {
        existing.seconds += lang.total_seconds;
      } else {
        langMap.set(lang.name, { seconds: lang.total_seconds, name: lang.name });
      }
    }
  }

  const totalLangSeconds = Array.from(langMap.values()).reduce((sum, l) => sum + l.seconds, 0);
  const languages = Array.from(langMap.values())
    .sort((a, b) => b.seconds - a.seconds)
    .map((l) => ({
      name: l.name,
      total_seconds: l.seconds,
      percent: totalLangSeconds > 0 ? (l.seconds / totalLangSeconds) * 100 : 0,
      digital: '',
      text: formatTime(l.seconds),
      hours: Math.floor(l.seconds / 3600),
      minutes: Math.floor((l.seconds % 3600) / 60),
    }));

  const dailyData = summary.data.map((day) => ({
    date: day.range.date,
    seconds: day.grand_total.total_seconds,
  }));

  return {
    totalTime: allTime.text,
    dailyAverage: summary.daily_average.text_including_other_language,
    totalSeconds: allTime.total_seconds,
    languages,
    dailyData,
  };
}

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs} hrs ${mins} mins`;
  return `${mins} mins`;
}
