import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;
const API_BASE = "https://api.wakatime.com/api/v1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/wakatime", async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.WAKATIME_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing WAKATIME_API_KEY" });
    }

    const endpoint = req.path.replace(/^\/+/, "");
    const query = req.url.includes("?")
      ? req.url.slice(req.url.indexOf("?"))
      : "";
    const target = `${API_BASE}/${endpoint}${query}`;

    const token = Buffer.from(`${apiKey}:`).toString("base64");
    const upstream = await fetch(target, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    const body = await upstream.text();
    res.status(upstream.status);
    res.set(
      "content-type",
      upstream.headers.get("content-type") || "application/json",
    );
    return res.send(body);
  } catch {
    return res.status(500).json({ error: "Proxy request failed" });
  }
});

app.use(express.static(path.join(__dirname, "dist")));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
