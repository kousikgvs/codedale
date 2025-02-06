import mongoose from "mongoose";
const AdminModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
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
        default: "",
        enum: ['male', 'female'],
        required: true
    },

}, { timestamps: true })

export const Admin = mongoose.model("Admin", AdminModel);