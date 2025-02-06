import express from "express";
import { login, logout, register } from "../controllers/AdminController.js";
// import isAuthAdmin from "../Middleware/isAuthAdmin.js";
import dotenv from "dotenv"
dotenv.config({})
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
// router.route("/").get(isAuthenticated, getOtherUsers);

export default router; 