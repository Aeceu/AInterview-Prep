import express, { Request, Response } from "express";
import {
  handleTestAI,
  LoginSuccess,
  Logout,
} from "../controllers/user.controller";
import passport from "passport";

const router = express.Router();

router.get("/login/success", LoginSuccess);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (_: Request, res: Response) => {
    const clientUrl = process.env.CLIENT_URL!;
    res.redirect(clientUrl);
  },
);
router.get("/logout", Logout);

router.post("/test", handleTestAI);

export default router;
