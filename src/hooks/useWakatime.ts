import { useState, useEffect } from 'react';
import type { CodingStats } from '../types/wakatime.ts';
import { getCodingStats } from '../services/wakatime.ts';

interface UseWakatimeResult {
  data: CodingStats | null;
  loading: boolean;
  error: string | null;
}

export function useWakatime(): UseWakatimeResult {
  const [data, setData] = useState<CodingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCodingStats()
      .then((stats) => {
        if (!cancelled) {
          setData(stats);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
