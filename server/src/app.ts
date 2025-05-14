import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

// Routes
import userRoute from "./routes/user.routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("combined"));

app.use("/api/v1/", userRoute);

app.use(errorHandler);

export default app;
