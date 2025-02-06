import { Course } from "../models/courseModel.js";
import express from "express";
export const createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseId,
            courseRating,
            courseDescription,
            courseCategory,
            courseLevel,
            courseLanguage
        } = req.body;

        if (!courseName || !courseId || !courseRating || !courseDescription ||
            !courseCategory || !courseLevel || !courseLanguage) {
            return res.status(400).json({
                success: false,
                message: "All fields are required to create a course."
            });
        }

        const course = await Course.create({
            courseName,
            courseId,
            courseRating,
            courseDescription,
            courseCategory,
            courseLevel,
            courseLanguage
        });

        res.status(201).json({ success: true, data: course });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            success: true,
            data: courses,
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const addcourses = async (req, res) => {
    var arr = [
        {
            "courseName": "JavaScript Basics",
            "courseId": "JS101",
            "courseRating": 5,
            "courseDescription": "Learn the fundamentals of JavaScript.",
            "courseCategory": "Programming",
            "courseLevel": "Beginner",
            "courseLanguage": "English"
        },
        {
            "courseName": "Advanced React",
            "courseId": "REACT201",
            "courseRating": 4,
            "courseDescription": "Master React concepts and build dynamic web applications.",
            "courseCategory": "Web Development",
            "courseLevel": "Advanced",
            "courseLanguage": "English"
        },
        {
            "courseName": "Data Science with Python",
            "courseId": "DSPY101",
            "courseRating": 5,
            "courseDescription": "Get started with Data Science using Python and its libraries.",
            "courseCategory": "Data Science",
            "courseLevel": "Beginner",
            "courseLanguage": "English"
        },
        {
            "courseName": "Web Security Essentials",
            "courseId": "SEC201",
            "courseRating": 4,
            "courseDescription": "Learn essential web security principles and techniques.",
            "courseCategory": "Cybersecurity",
            "courseLevel": "Intermediate",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "Machine Learning Fundamentals",
            "courseId": "ML101",
            "courseRating": 5,
            "courseDescription": "An introduction to Machine Learning and its algorithms.",
            "courseCategory": "Data Science",
            "courseLevel": "Beginner",
            "courseLanguage": "Telugu"
        },
        {
            "courseName": "Java for Beginners",
            "courseId": "JAVA101",
            "courseRating": 3,
            "courseDescription": "Learn Java programming from scratch.",
            "courseCategory": "Programming",
            "courseLevel": "Beginner",
            "courseLanguage": "English"
        },
        {
            "courseName": "Full Stack Web Development",
            "courseId": "FSWD301",
            "courseRating": 5,
            "courseDescription": "Learn both front-end and back-end web development.",
            "courseCategory": "Web Development",
            "courseLevel": "Advanced",
            "courseLanguage": "English"
        },
        {
            "courseName": "Deep Learning with TensorFlow",
            "courseId": "DLTF301",
            "courseRating": 4,
            "courseDescription": "Dive deep into neural networks with TensorFlow.",
            "courseCategory": "Data Science",
            "courseLevel": "Advanced",
            "courseLanguage": "English"
        },
        {
            "courseName": "Linux for Beginners",
            "courseId": "LINUX101",
            "courseRating": 3,
            "courseDescription": "Learn Linux command line basics.",
            "courseCategory": "Programming",
            "courseLevel": "Beginner",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "Cybersecurity for Beginners",
            "courseId": "SEC101",
            "courseRating": 5,
            "courseDescription": "Get an introduction to Cybersecurity concepts.",
            "courseCategory": "Cybersecurity",
            "courseLevel": "Beginner",
            "courseLanguage": "Telugu"
        },
        {
            "courseName": "Advanced JavaScript",
            "courseId": "JS201",
            "courseRating": 4,
            "courseDescription": "Explore advanced JavaScript concepts.",
            "courseCategory": "Programming",
            "courseLevel": "Intermediate",
            "courseLanguage": "English"
        },
        {
            "courseName": "Introduction to Web Development",
            "courseId": "WD101",
            "courseRating": 5,
            "courseDescription": "Learn web development from scratch.",
            "courseCategory": "Web Development",
            "courseLevel": "Beginner",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "Artificial Intelligence Concepts",
            "courseId": "AI101",
            "courseRating": 4,
            "courseDescription": "Get an overview of Artificial Intelligence.",
            "courseCategory": "Data Science",
            "courseLevel": "Intermediate",
            "courseLanguage": "Telugu"
        },
        {
            "courseName": "Full Stack Development with Django",
            "courseId": "FSDJ301",
            "courseRating": 4,
            "courseDescription": "Learn full-stack web development using Django and React.",
            "courseCategory": "Web Development",
            "courseLevel": "Advanced",
            "courseLanguage": "English"
        },
        {
            "courseName": "Cloud Computing Basics",
            "courseId": "CC101",
            "courseRating": 3,
            "courseDescription": "Understand the basics of cloud computing.",
            "courseCategory": "Data Science",
            "courseLevel": "Beginner",
            "courseLanguage": "Telugu"
        },
        {
            "courseName": "C++ for Beginners",
            "courseId": "CPLUS101",
            "courseRating": 5,
            "courseDescription": "Learn C++ programming language from the basics.",
            "courseCategory": "Programming",
            "courseLevel": "Beginner",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "Network Security Essentials",
            "courseId": "NETSEC201",
            "courseRating": 4,
            "courseDescription": "Learn the fundamentals of network security.",
            "courseCategory": "Cybersecurity",
            "courseLevel": "Intermediate",
            "courseLanguage": "English"
        },
        {
            "courseName": "Advanced Data Analytics with R",
            "courseId": "DAR301",
            "courseRating": 5,
            "courseDescription": "Advanced data analysis techniques with R.",
            "courseCategory": "Data Science",
            "courseLevel": "Advanced",
            "courseLanguage": "English"
        },
        {
            "courseName": "Python for Data Science",
            "courseId": "PYDS101",
            "courseRating": 5,
            "courseDescription": "Master Python for Data Science.",
            "courseCategory": "Data Science",
            "courseLevel": "Beginner",
            "courseLanguage": "English"
        },
        {
            "courseName": "Cybersecurity for Advanced Users",
            "courseId": "SEC301",
            "courseRating": 5,
            "courseDescription": "Advanced Cybersecurity techniques and tools.",
            "courseCategory": "Cybersecurity",
            "courseLevel": "Advanced",
            "courseLanguage": "English"
        },
        {
            "courseName": "Building Web Applications with Flask",
            "courseId": "WEBFLASK301",
            "courseRating": 4,
            "courseDescription": "Learn how to build web applications using Flask.",
            "courseCategory": "Web Development",
            "courseLevel": "Intermediate",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "Blockchain for Beginners",
            "courseId": "BLOCKCHAIN101",
            "courseRating": 3,
            "courseDescription": "Introduction to blockchain technology.",
            "courseCategory": "Cybersecurity",
            "courseLevel": "Beginner",
            "courseLanguage": "Telugu"
        },
        {
            "courseName": "Algorithms and Data Structures",
            "courseId": "ALGO201",
            "courseRating": 4,
            "courseDescription": "Learn fundamental algorithms and data structures.",
            "courseCategory": "Programming",
            "courseLevel": "Intermediate",
            "courseLanguage": "English"
        },
        {
            "courseName": "SQL for Beginners",
            "courseId": "SQL101",
            "courseRating": 4,
            "courseDescription": "Learn the basics of SQL and relational databases.",
            "courseCategory": "Data Science",
            "courseLevel": "Beginner",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "Data Visualization with Python",
            "courseId": "DVPY301",
            "courseRating": 5,
            "courseDescription": "Create beautiful visualizations using Python.",
            "courseCategory": "Data Science",
            "courseLevel": "Advanced",
            "courseLanguage": "Telugu"
        },
        {
            "courseName": "Responsive Web Design",
            "courseId": "RWD101",
            "courseRating": 5,
            "courseDescription": "Learn responsive web design techniques.",
            "courseCategory": "Web Development",
            "courseLevel": "Beginner",
            "courseLanguage": "English"
        },
        {
            "courseName": "Node.js for Backend Development",
            "courseId": "NODE301",
            "courseRating": 4,
            "courseDescription": "Learn how to build server-side applications with Node.js.",
            "courseCategory": "Web Development",
            "courseLevel": "Advanced",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "DevOps Essentials",
            "courseId": "DEVOPS101",
            "courseRating": 5,
            "courseDescription": "Understand the principles of DevOps and its tools.",
            "courseCategory": "Cybersecurity",
            "courseLevel": "Beginner",
            "courseLanguage": "English"
        },
        {
            "courseName": "Mobile App Development with Flutter",
            "courseId": "FLUTTER201",
            "courseRating": 4,
            "courseDescription": "Learn mobile app development using the Flutter framework.",
            "courseCategory": "Web Development",
            "courseLevel": "Intermediate",
            "courseLanguage": "Telugu"
        },
        {
            "courseName": "React.js for Beginners",
            "courseId": "REACT101",
            "courseRating": 5,
            "courseDescription": "Learn React.js from the ground up.",
            "courseCategory": "Web Development",
            "courseLevel": "Beginner",
            "courseLanguage": "English"
        },
        {
            "courseName": "Java Programming for Intermediate Developers",
            "courseId": "JAVA201",
            "courseRating": 4,
            "courseDescription": "Intermediate Java programming concepts.",
            "courseCategory": "Programming",
            "courseLevel": "Intermediate",
            "courseLanguage": "Hindi"
        },
        {
            "courseName": "Python for Machine Learning",
            "courseId": "PYML201",
            "courseRating": 5,
            "courseDescription": "Learn Python for machine learning and data analysis.",
            "courseCategory": "Data Science",
            "courseLevel": "Intermediate",
            "courseLanguage": "English"
        }
    ]

    for (const courseData of arr) {
        const { courseName, courseId, courseRating, courseDescription, courseCategory, courseLevel, courseLanguage } = courseData;

        await Course.create({
            courseName,
            courseId,
            courseRating,
            courseDescription,
            courseCategory,
            courseLevel,
            courseLanguage
        });
    }

    return res.status(201).json({
        success: true,
        message: "Courses added successfully"
    });
}