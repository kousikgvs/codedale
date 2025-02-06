import express from "express";
import {
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCourses,
    addcourses
} from "../controllers/courseController.js";
// import isAuthenticated from "../middleware/isAuthenticated.js";
import isAuthAdmin from "../middleware/isAuthAdmin.js";
const router = express.Router();

router.get("/getcourse", getCourses);
router.get("/courses/:id", getCourseById);
router.get("/addall", addcourses);
router.post("/create", isAuthAdmin, createCourse);
router.put("/update/:id", isAuthAdmin, updateCourse);
router.delete("/delete/:id", isAuthAdmin, deleteCourse);
// 
export default router;
