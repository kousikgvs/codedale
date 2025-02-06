import { Admin } from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        var { fullName, username, password, confirmPassword, gender, role } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password fields do not match" });
        }

        const existingUser = await Admin.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists, try a different one" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create the user
        const newAdmin = await Admin.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            role
        });

        res.status(201).json({ message: "User created successfully", Admin: newAdmin });

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
        const existingUser = await Admin.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Username doesnt exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "ncorrect Password"
            })
        }
        const tokenData = {
            AdminId: existingUser._id,
            role: "admin"
        }
        const admintoken = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("admintoken", admintoken, { maxAge: 1 * 24 * 60 * 60 * 1000, httponly: true, sameSite: 'strict' }).json({
            _id: existingUser._id,
            username: existingUser.username,
            fullName: existingUser.fullName,
            profilePhoto: existingUser.profilePhoto,
            "message": "Logged in sucessfully",
        });
        console.log("Logged in Successfuly");
    }
    catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("admintoken", "", { maxAge: 0 }).json({
            message: "User has been Logged out Successfully"
        })
    }
    catch (error) {
        console.log(error);
    }
}