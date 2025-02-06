import { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styling/Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storeusername } from '../reducer/actions';
import CryptoJS from 'crypto-js';

const Login = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch("https://codedale.onrender.com/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                setUserData(data);
                console.log(data.token)
                localStorage.setItem("authToken", data.token);
                setSubmitted(true);
                localStorage.setItem("username", values.username);
                setMessage("Login successful!");
                dispatch(storeusername(values.username));
                toast.success("Login Successful!");
                navigate("/userDashboard");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed");
                setMessage("Login failed");
                toast.error(errorData.message || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600 login">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Login</h2>
                {submitted ? (
                    <div className="text-center">
                        <p className="text-green-500">Login Successful!</p>
                        <p className="mt-4">Welcome, {userData?.username}!</p>
                        <Link to="/userDashboard">Go to User Dashboard</Link>
                    </div>
                ) : (
                    <>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <Formik
                            initialValues={{
                                username: "",
                                password: "",
                            }}
                            validationSchema={Yup.object({
                                username: Yup.string().required("Username is required"),
                                password: Yup.string()
                                    .min(6, "Password must be at least 6 characters")
                                    .required("Password is required"),
                            })}
                            onSubmit={handleSubmit}
                        >
                            <Form className="flex flex-col">
                                <label className="label">Username</label>
                                <Field name="username" type="text" className="input" />
                                <ErrorMessage name="username" component="div" className="error" />

                                <label className="label">Password</label>
                                <Field name="password" type="password" className="input" />
                                <ErrorMessage name="password" component="div" className="error" />

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="btn mt-4"
                                >
                                    Login
                                </motion.button>
                                {message && <div className="mt-2 text-center">{message}</div>}
                            </Form>
                        </Formik>
                    </>
                )}
            </motion.div>

            <ToastContainer />
        </div>
    );
};

export default Login;
