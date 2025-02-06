import { useEffect, useState } from "react";
import "../styling/userDashboard.css";
import EnrolledCourses from "./EnrolledCourses";
import "../styling/EnrolledCourses.css"
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for toggle

const UserDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        courseName: "",
        courseRating: "",
        courseCategory: "",
        courseLevel: "",
        courseLanguage: "",
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    var storedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];


    useEffect(() => {
        if (storedCourses) {
            setCourses(storedCourses)
        }
        
        fetch("http://localhost:8080/course/getcourse")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                localStorage.setItem("allcourses", JSON.stringify(data.data));
                setCourses(data.data);
                setFilteredCourses(data.data);
            }).catch((error) => console.error("Error fetching courses:", error));
        
    }, []);

    useEffect(() => {
        let filtered = courses.filter((course) => {
            return (
                (filters.courseName === "" || course.courseName.toLowerCase().includes(filters.courseName.toLowerCase())) &&
                (filters.courseRating === "" || course.courseRating === parseInt(filters.courseRating)) &&
                (filters.courseCategory === "" || course.courseCategory === filters.courseCategory) &&
                (filters.courseLevel === "" || course.courseLevel === filters.courseLevel) &&
                (filters.courseLanguage === "" || course.courseLanguage.toLowerCase() === filters.courseLanguage.toLowerCase())
            );
        });

        setFilteredCourses(filtered);
    }, [filters, courses]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    const handleEnroll = async (courseId) => {
        try {
            const token = localStorage.getItem("authToken"); // Get token from localStorage or sessionStorage
            console.log("-------------------------------------------------------------")
            console.log(token)

            if (!token) {
                throw new Error("Authentication token is missing.");
            }

            const response = await fetch('http://localhost:8080/users/enroll/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ "enId": courseId, "type": "Web" })
            });

            if (!response.ok) {
                throw new Error(`Enrollment failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Enrollment successful:', data);
        } catch (error) {
            console.error('Error during enrollment:', error);
        }
    };


    // Pagination logic
    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="div0">
            <div className="side1">
                <h3>Filters</h3>
                <input
                    type="text"
                    name="courseName"
                    placeholder="Search by Course Name"
                    value={filters.courseName}
                    onChange={handleFilterChange}
                />
                <select name="courseRating" value={filters.courseRating} onChange={handleFilterChange}>
                    <option value="">All Ratings</option>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                </select>
                <select name="courseCategory" value={filters.courseCategory} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="Programming">Programming</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                </select>
                <select name="courseLevel" value={filters.courseLevel} onChange={handleFilterChange}>
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
                <select name="courseLanguage" value={filters.courseLanguage} onChange={handleFilterChange}>
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Telugu">Telugu</option>
                </select>
            </div>

            <div className="side2">
                <h2>Available Courses</h2>
                <div className="border p-4 rounded-lg shadow-md">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-between w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        <div id="showenrolled">
                            <span>{isOpen ? "Hide" : "Show"} Enrolled Courses</span>
                            <p>{isOpen ? <ChevronUp /> : <ChevronDown />}</p>
                        </div>
                    </button>

                    {isOpen && (
                        <div className="mt-4">
                            <EnrolledCourses />
                        </div>
                    )}
                </div>

                <div id="availablecourses">
                    <ul>
                        {currentCourses.map((course, index) => (
                            <li key={index}>
                                <h3>{course.courseName}</h3>
                                <p>Rating: {course.courseRating} Stars</p>
                                <p>Category: {course.courseCategory}</p>
                                <p>Level: {course.courseLevel}</p>
                                <p>Language: {course.courseLanguage}</p>
                                <button className="enroll_button" onClick={() => handleEnroll(course._id)}>
                                    Enroll Now
                                </button>
                            </li>
                        )
                        )}
                    </ul>
                    {/* Pagination Controls */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredCourses.length / itemsPerPage) }, (_, index) => (
                            <button key={index + 1} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
