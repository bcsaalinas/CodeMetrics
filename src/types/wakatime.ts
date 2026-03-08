export interface AllTimeSinceToday {
  text: string;
  digital: string;
  total_seconds: number;
  is_up_to_date: boolean;
}

export interface DailyAverage {
  text: string;
  text_including_other_language: string;
  seconds: number;
  seconds_including_other_language: number;
}

export interface SummaryLanguage {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  text: string;
  hours: number;
  minutes: number;
}

export interface SummaryDay {
  grand_total: {
    digital: string;
    hours: number;
    minutes: number;
    text: string;
    total_seconds: number;
  };
  languages: SummaryLanguage[];
  range: {
    date: string;
    text: string;
  };
}

export interface SummaryResponse {
  data: SummaryDay[];
  cumulative_total: {
    seconds: number;
    text: string;
    digital: string;
  };
  daily_average: DailyAverage;
  start: string;
  end: string;
}

export interface CodingStats {
  totalTime: string;
  dailyAverage: string;
  totalSeconds: number;
  languages: SummaryLanguage[];
  dailyData: { date: string; seconds: number }[];
}
