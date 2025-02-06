import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import dotenv from "dotenv"
import { addEnrollment } from "../controllers/userController.js";
import { getEnrolledData } from "../controllers/userController.js";
dotenv.config({})
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/enroll").post(isAuthenticated, addEnrollment);
router.route("/").get(isAuthenticated, getOtherUsers);
router.route("/fetchenrolled/").post(isAuthenticated, getEnrolledData);


export default router; 