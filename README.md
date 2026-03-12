# CodeMetrics

Modern coding analytics dashboard powered by WakaTime, built with React, TypeScript, Vite, Tailwind CSS, GSAP, and an Express production server.

## Live Demo

https://codemetrics.onrender.com

## What It Does

CodeMetrics shows your coding activity in a clean, animated dashboard using data from the WakaTime API.

- Displays total coding time and daily average
- Builds a top-language breakdown for the current month
- Visualizes daily activity as a bar graph
- Embeds your public WakaTime all-time language chart
- Includes loading and error states for API failures

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS
- GSAP + ScrollTrigger animations
- Express 5 (production server + API proxy)

## Project Structure

```txt
.
|- server.js
|- vite.config.ts
|- src/
|  |- App.tsx
|  |- components/
|  |- hooks/
|  |- services/
|  |- types/
|  `- index.css
`- public/
```

## Requirements

- Node.js 18+
- npm
- WakaTime account

## Make This Project Your Own

To use your own WakaTime data, complete these steps:

1. Sign in to WakaTime.
2. Connect your IDE/editor to WakaTime using the official plugin for your editor.
3. Open WakaTime settings and copy your API key.
4. Create a `.env` file in the project root.
5. Add your environment variables.

### Environment Variables

Create `.env` in the root of the project:

```env
# Required for local development (Vite dev proxy)
VITE_WAKATIME_API_KEY=waka_your_api_key_here

# Optional: used by the "All-Time Languages" embed component
VITE_WAKATIME_USER_ID=your_wakatime_user_id
VITE_WAKATIME_CHART_ID=your_wakatime_chart_id

# Required for production/Express server
WAKATIME_API_KEY=waka_your_api_key_here

# Optional server port (default: 10000)
PORT=10000
```

Notes:

- `VITE_WAKATIME_API_KEY` is required to run the app locally with `npm run dev`.
- `WAKATIME_API_KEY` is required when running the Express server in production mode (`npm run start`).
- Never commit your real API keys.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the app:

```txt
http://localhost:5173
```

## Production Build

Build the frontend:

```bash
npm run build
```

Run the production server (serves `dist/` and proxies `/api/wakatime`):

```bash
npm run start
```

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build production bundle
- `npm run preview` - preview built frontend with Vite
- `npm run start` - run Express production server
- `npm run lint` - run ESLint

## Security

- Keep API keys in `.env` only
- Do not expose secrets in source code
- Do not commit `.env` to GitHub

## License

ISC
