import express from "express";
import userRoutes from "../backend/routers/userRoutes.js";
import AdminRoutes from "../backend/routers/AdminRoutes.js";
import courseRoutes from "../backend/routers/courseRoutes.js"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";  // Import cors
import path from "path";

const __dirname = path.resolve();
const app = express();
dotenv.config({});
const PORT = process.env.PORT;

app.use(cors({
    origin: "https://codedale.onrender.com/",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Use routes
app.use("/users", userRoutes);
app.use("/admin", AdminRoutes);
app.use("/course", courseRoutes);


app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*" , (_ , res)=> {
    res.sendFile(path.resolve(__dirname , "frontend" , "dist" , "index.html"));
});


app.listen(PORT, () => {
    connectDB();
    console.log(`The server is running at http://localhost:${PORT}`);
});
