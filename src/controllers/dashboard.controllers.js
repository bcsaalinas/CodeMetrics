import {
  getAllTimeSinceToday,
  getSummary,
} from "../services/wakatime.service.js";

export async function showHome(req, res) {
  //getting all the time spent coding since the creation of the wakatime acc
  const stats = await getAllTimeSinceToday();

  //get the summary from wakatime
  const summary = await getSummary();
  const dailyAvg = summary.daily_average.text_including_other_language;

  console.log(summary);

  res.render("layouts/main", {
    timeText: stats.text,
    digital: stats.digital,
    totalSeconds: stats.total_seconds,
    dailyAverage: dailyAvg,
  });
}
