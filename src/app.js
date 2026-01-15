import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve the static files
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// temp test route to make sure everything works

app.use("/", indexRoutes);

export default app;
