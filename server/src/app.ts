import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import passportStrategy from "./passport";

// Routes
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

app.use("/api/auth", userRoute);

app.use(errorHandler);

export default app;
