import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import { errorHandler } from "./middlewares/errorHandler";
import passportStrategy from "./passport";

// Routes
import questionRoute from "./routes/question.routes";
import userRoute from "./routes/user.routes";

passportStrategy();
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4200"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", userRoute);
app.use("/api/v1", questionRoute);

app.use(errorHandler);

export default app;
