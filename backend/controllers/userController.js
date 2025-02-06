import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Course } from "../models/courseModel.js";

export const register = async (req, res) => {
    try {
        var { fullName, username, password, confirmPassword, gender, role } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password fields do not match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists, try a different one" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create the user
        const newUser = await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            role
        });
        res.status(201).json({ message: "User created successfully", user: newUser });
        console.log(newUser);

        console.log("User registration successful!");
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Server error, please try again later" });
    }
};

export const login = async (req, res) => {
    try {
        var { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Username doesn't exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }

        const tokenData = {
            userId: existingUser._id,
            role: "User",
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Send token in response for localStorage storage in frontend
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            _id: existingUser._id,
            username: existingUser.username,
            fullName: existingUser.fullName,
            profilePhoto: existingUser.profilePhoto,
            token,
            message: "Logged in successfully",
        });

        console.log("Logged in Successfully");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User has been Logged out Successfully"
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedinUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedinUserId } }).select("-password")
        return res.status(200).json(otherUsers);
    }
    catch (error) {
        console.log(error);
    }
}

export const addEnrollment = async (req, res) => {
    try {
        console.log(req)
        const loggedInUserId = req.id;

        const user = await User.findById(loggedInUserId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const enrollmentId = req.body.enId;
        if (!enrollmentId) {
            return res.status(400).json({ message: "Enrollment ID not provided" });
        }

        user.enrolled.push(enrollmentId);
        await user.save();


        return res.status(200).json({ message: "Enrollment added", enrolled: user.enrolled });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getEnrolledData = async (req, res) => {
    try {
        const loggedInUserId = req.id;

        const user = await User.findById(loggedInUserId).select("-password").populate("enrolled");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);
        return res.status(200).json({ message: "Enrollment added", enrolled: user.enrolled });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};