import express from "express";
import commentController from "../controller/commentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, commentController.addComment);
router.post("/delete/:id", auth, commentController.deleteComment);

export default router;
