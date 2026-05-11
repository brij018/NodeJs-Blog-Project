import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.get("/login", authController.renderLogin);
router.post("/login", authController.login);

router.get("/register", authController.renderRegister);
router.post("/register", authController.register);

router.get("/logout", authController.logout);

export default router;
