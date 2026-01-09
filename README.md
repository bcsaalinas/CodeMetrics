Subject: README.md for CodeMetrics

# CodeMetrics 📊⌨️

A personal coding analytics dashboard powered by the WakaTime API — built with **Node.js, Express, EJS, Tailwind CSS, and Axios**.

> This project turns WakaTime data into a clean, modern dashboard you can use as a “developer activity + productivity” snapshot — perfect as a portfolio piece and a real-world REST API integration demo.

---

## 🚀 Features (current + planned)

### ✅ Current

- Server-side integration with the **WakaTime REST API**
- Secure API key handling using **environment variables** (`.env`)
- EJS templating + reusable partials
- Tailwind-based modern UI foundation

### 🧠 Planned

- Dashboard cards:

  - Total coding time (last 7 days)
  - Top languages
  - Top projects
  - Daily activity breakdown

- Charts (Chart.js)
- “Shareable” public view (read-only)
- Caching layer (to reduce API calls + improve performance)
- Error states + loading skeletons for a polished UX

---

## 🧱 Tech Stack

- **Node.js + Express** — backend server + routes
- **EJS** — server-rendered views
- **Tailwind CSS** — UI styling
- **Axios** — HTTP client for API calls
- **WakaTime API** — coding activity data

---

## 🔐 Security Notes (important)

This app uses a **WakaTime API Key**, which must **never** be committed to GitHub.

✅ Do:

- store it in a local `.env` file
- use `process.env.WAKATIME_API_KEY` on the server only

❌ Don’t:

- paste keys into client-side code
- commit `.env`

---

## 📦 Getting Started

### 1) Clone the repo

```bash
git clone https://github.com/<your-username>/codemetrics.git
cd codemetrics
```

### 2) Install dependencies

```bash
npm install
```

### 3) Create a `.env` file

Create a file named `.env` in the project root:

```env
WAKATIME_API_KEY=your_api_key_here
PORT=3000
```

> Get your API key from: WakaTime → Settings → API Key

### 4) Run the app

```bash
npm run dev
```

Then open:

- [http://localhost:3000](http://localhost:3000)

---

## 🗂 Project Structure (planned)

```txt
src/
  app.js
  routes/
  controllers/
  services/
    wakatime.js
  views/
    layouts/
    pages/
    partials/
public/
  styles/
  js/
```

---

## 🗺 Roadmap

- [ ] Tailwind pipeline (build/watch)
- [ ] WakaTime service module (`services/wakatime.js`)
- [ ] `/dashboard` route rendering real API data
- [ ] Charts + UI polish
- [ ] Shareable public view
- [ ] Caching + production hardening
- [ ] Deploy (Render/Railway/Fly.io)

---

## 🤝 Contributing

This is primarily a personal portfolio project, but issues and suggestions are welcome.

---

## 📄 License

MIT (or your preferred license)

---

## ✨ Author

Alberto Cisneros Salinas
(Computer Science Student — Universidad Panamericana)
