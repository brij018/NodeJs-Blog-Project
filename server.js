import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import HttpError from "./middleware/HttpError.js";

import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);
app.use("/articles", articleRoutes);
app.use("/comments", commentRoutes);

app.use((req, res, next) => {
  next(new HttpError("route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const statusCode = error.statusCode || 500;
  const message = error.message || "internal server error";

  if (req.accepts("html")) {
    return res
      .status(statusCode)
      .render("error", { message, statusCode, user: req.user || null });
  }

  res.status(statusCode).json({ message });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log("server is live on port:", process.env.PORT);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
