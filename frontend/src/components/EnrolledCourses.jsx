import { useEffect, useState } from 'react';
import "../styling/EnrolledCourses.css"
const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const [refresh, setrefresh] = useState(0);
    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const token = localStorage.getItem("authToken");
                console.log("-------------------------------------------------------------");
                console.log(token);

                if (!token) {
                    throw new Error("Authentication token is missing.");
                }

                const response = await fetch('http://localhost:8080/users/fetchenrolled', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                    body: JSON.stringify({ "type": "Web" })
                });

                if (!response.ok) {
                    throw new Error(`Enrollment failed with status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Enrollment successful:', data);

                console.log("---------------------------------------")
                console.log(data.enrolled);
                setCourses(data.enrolled);
            } catch (error) {
                console.error('Error during enrollment:', error);
            }
        };

        fetchEnrolledCourses();
    }, [refresh]);

    return (
        <div id="enrolledcourses">
            <div id="RefreshButton">
                <h2>Enrolled Courses</h2>
                <button onClick={() => {
                    setrefresh(1);
                }}>Refresh</button>
            </div>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>
                        <h3>{course.courseName}</h3>
                        <p>Rating: {course.courseRating} Stars</p>
                        <p>Category: {course.courseCategory}</p>
                        <p>Level: {course.courseLevel}</p>
                        <p>Language: {course.courseLanguage}</p>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default EnrolledCourses;
