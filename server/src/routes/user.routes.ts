import express from "express";
import {
  handleLoginController,
  handleRefreshController,
  handleRegisterController,
  handleTestAI,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/login", handleLoginController);
router.post("/signup", handleRegisterController);
router.get("/refresh", handleRefreshController);

router.post("/test", handleTestAI);

export default router;
