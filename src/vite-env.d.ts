/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAKATIME_API_KEY: string;
  readonly VITE_WAKATIME_USER_ID: string;
  readonly VITE_WAKATIME_CHART_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
