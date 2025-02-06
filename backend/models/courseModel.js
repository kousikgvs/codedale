import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        unique: true,
        required: true
    },
    courseRating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    courseDescription: {
        type: String,
        required: true,
    },
    courseCategory: {
        type: String,
        required: true
    },
    courseLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },
    courseLanguage: {
        type: String,
        enum: ["Telugu", "Hindi", "English"],
        required: true
    }
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
