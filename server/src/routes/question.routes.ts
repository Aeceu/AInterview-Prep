import express from "express";
import {
  handleFetchQuestionsController,
  handleGenerateQuestionController,
  handleSaveQuestionsController,
} from "../controllers/question.controller";

const router = express.Router();

router.post("/question/save", handleSaveQuestionsController);
router.post("/question/generate", handleGenerateQuestionController);
router.get("/question/:userId", handleFetchQuestionsController);

export default router;
