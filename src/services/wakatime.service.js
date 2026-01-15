import axios from "axios";
import { env } from "../config/env.js";

//we use a client with axios.create to define a base url and headers only once, and reuse them in the other files
const client = axios.create({
  baseURL: env.API_URL,
  auth: {
    username: env.API_KEY,
    password: "", //no password needed for basic auth
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllTimeSinceToday() {
  const response = await client.get("users/current/all_time_since_today");

  return response.data.data;
}

export async function getSummary() {
  // get start and end date, summary is from beggining of the current month to the current date
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const startDate = `${year}-${month}`;
  const endDate = date.toISOString().slice(0, 10);

  const response = await client.get(
    `users/current/summaries?start=${startDate}&end=${endDate}`
  );

  return response.data;
}
