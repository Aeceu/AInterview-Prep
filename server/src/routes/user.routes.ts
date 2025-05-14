import express from "express";
import {
  handleLoginController,
  handleRefreshController,
  handleRegisterController,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/login", handleLoginController);
router.post("/signup", handleRegisterController);
router.get("/refresh", handleRefreshController);

export default router;
