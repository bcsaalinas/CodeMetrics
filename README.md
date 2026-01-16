# CodeMetrics 📊⌨️

A personal coding analytics dashboard powered by the WakaTime API — built with **Node.js, Express, EJS, Tailwind CSS, and Axios**.

> This project turns WakaTime data into a clean, modern dashboard you can use as a “developer activity + productivity” snapshot — perfect as a portfolio piece and a real-world REST API integration demo.

---

🔗 **Live Demo:** https://codemetrics.onrender.com

## 🖼 Preview

![Dashboard Overview](docs/Dashboard.png)

## 🚀 Features

- Server-side integration with the **WakaTime REST API**
- Secure API key handling using **environment variables** (`.env`)
- EJS templating + reusable layouts
- Tailwind-based modern UI foundation
- Dashboard cards for **total coding time** and **daily average**
- Language breakdown embed (WakaTime share)

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
- use `process.env.API_KEY` on the server only

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
API_KEY=your_api_key_here
PORT=3000
API_URL=https://wakatime.com/api/v1
```

> Get your API key from: WakaTime → Settings → API Key

### 4) Run the app

```bash
node server.js
```

Then open:

- [http://localhost:3000](http://localhost:3000)

### 5) Build Tailwind CSS (optional)

```bash
npm run build:css
```

For live updates during development:

```bash
npm run watch:css
```

---

## 🗂 Project Structure

```txt
src/
  app.js
  routes/
  controllers/
  services/
    wakatime.service.js
  views/
    layouts/
    pages/
  styles/
    input.css
public/
  css/
    styles.css
```

---

## 🗺 Roadmap

- [ ] Charts + UI polish
- [ ] Additional metrics (top languages/projects, daily breakdowns)
- [ ] Shareable public view
- [ ] Caching + production hardening
- [ ] Deploy (Render/Railway/Fly.io)

---

## 🤝 Contributing

This is primarily a personal portfolio project, but issues and suggestions are welcome.

---

## 📄 License

MIT

---

## ✨ Author

Alberto Cisneros Salinas
(Computer Science Student — Universidad Panamericana)
