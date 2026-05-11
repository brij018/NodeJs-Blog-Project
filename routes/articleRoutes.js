import express from "express";
import articleController from "../controller/articleController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.get("/", auth, articleController.getAllArticles);
router.get("/my", auth, articleController.getMyArticles);
router.get("/new", auth, articleController.getArticleForm);
router.get("/edit/:id", auth, articleController.getArticleForm);
router.get("/view/:id", auth, articleController.getArticleById);

router.post("/", auth, articleController.createArticle);
router.post("/update/:id", auth, articleController.updateArticle);
router.post("/delete/:id", auth, articleController.deleteArticle);

export default router;
