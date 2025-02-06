import { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styling/Signup.css";
import Chatbot from "./ChatBot";

const SignupForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log("I am here bruh");

            // Log the values before sending the request
            console.log("Values to be sent:", values);

            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Ensure the correct Content-Type header
                },
                body: JSON.stringify(values), // Ensure that values is a properly structured object
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Signup Successful!");
                setSubmitted(true); // Set submitted to true upon successful signup
            } else {
                // Log the response data for debugging
                console.error("Error response from server:", data);
                setMessage(data.message || "Signup Failed! Please try again.");
            }
        } catch (error) {
            setMessage("Error connecting to the server.");
            console.error("Error:", error); // Log the error for further debugging
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600 signup">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
                    Signup
                </h2>
                {submitted ? (
                    <p className="text-green-500 text-center">Signup Successful!</p>
                ) : (
                    <Formik
                        initialValues={{
                            fullName: "",
                            username: "",
                            password: "",
                            confirmPassword: "",
                            role: "user",
                            gender: "",
                        }}
                        validationSchema={Yup.object({
                            fullName: Yup.string().required("Full Name is required"),
                            username: Yup.string().required("Username is required"),
                            password: Yup.string()
                                .min(6, "Password must be at least 6 characters")
                                .required("Password is required"),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref("password"), null], "Passwords must match")
                                .required("Confirm Password is required"),
                            gender: Yup.string().required("Gender is required"),
                        })}
                        onSubmit={handleSubmit}  // Use handleSubmit directly
                    >
                        {({ isSubmitting, values, handleChange }) => (  // Destructure isSubmitting and handleChange
                            <Form className="flex flex-col">
                                <label className="label">Full Name</label>
                                <Field name="fullName" type="text" className="input" />
                                <ErrorMessage name="fullName" component="div" className="error" />

                                <label className="label">Username</label>
                                <Field name="username" type="text" className="input" />
                                <ErrorMessage name="username" component="div" className="error" />

                                <label className="label">Password</label>
                                <Field name="password" type="password" className="input" />
                                <ErrorMessage name="password" component="div" className="error" />

                                <label className="label">Confirm Password</label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="input"
                                    onChange={(e) => {
                                        handleChange(e);
                                        // Optionally reset the error message if value changes
                                    }}
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="error" />

                                <label className="label">Gender</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <Field type="radio" name="gender" value="male" className="mr-2" />
                                        Male
                                    </label>
                                    <label className="flex items-center">
                                        <Field type="radio" name="gender" value="female" className="mr-2" />
                                        Female
                                    </label>
                                </div>
                                <ErrorMessage name="gender" component="div" className="error" />

                                <label className="label">Role</label>
                                <Field as="select" name="role" className="input">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Field>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"  // Keep it as type="submit"
                                    className="btn mt-4"
                                    disabled={isSubmitting} // Disable button when submitting
                                >
                                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                                </motion.button>
                            </Form>
                        )}
                    </Formik>
                )}
            </motion.div>
            <Chatbot />
        </div>
    );
};

export default SignupForm;
