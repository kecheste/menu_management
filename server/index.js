import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    // origin: "https://menu-management-ltyh.vercel.app/",
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import menuRoutes from "./routes/menu.js";
import AppError from "./utils/AppError.js";

app.use("/menu", menuRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found!", 404));
});

app.listen(5000, () => {
  console.log("Serving on port 5000");
});
