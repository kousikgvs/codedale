import mongoose from "mongoose";
import { Schema } from "mongoose";

const userModel = new Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    enrolled: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
}, { timestamps: true });

export const User = mongoose.model("User", userModel);
