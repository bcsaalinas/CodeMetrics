export const env = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY,
  API_URL: process.env.API_URL || "https://wakatime.com/api/v1",
};

// function to make sure that the app only works if there is an API key
if (!env.API_KEY) {
  throw new Error("Missing env variable: API_KEY");
}
