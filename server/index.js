import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    // origin: "https://menu-management-ltyh.vercel.app",
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    // "https://menu-management-ltyh.vercel.app"
    "http://localhost:3000"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, PATCH, DELETE, POST, PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

import menuRoutes from "./routes/menu.js";
import AppError from "./utils/AppError.js";

app.use("/menu", menuRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found!", 404));
});

app.listen(5000, () => {
  console.log("Serving on port 5000");
});
