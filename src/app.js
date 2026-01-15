import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import expressLayouts from "express-ejs-layouts";

// static files
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/main"); // default layout

// routes
app.use("/", indexRoutes);

export default app;
