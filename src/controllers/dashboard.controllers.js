import {
  getAllTimeSinceToday,
  getSummary,
} from "../services/wakatime.service.js";

export async function showHome(req, res) {
  const stats = await getAllTimeSinceToday();
  const summary = await getSummary();
  const dailyAvg = summary.daily_average.text_including_other_language;

  console.log(summary);

  res.render("pages/dashboard", {
    timeText: stats.text,
    digital: stats.digital,
    totalSeconds: stats.total_seconds,
    dailyAverage: dailyAvg,
  });
}
