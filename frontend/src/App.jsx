import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SignupForm from "./components/Signup";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import "./App.css";

const App = () => {
  const username = useSelector((state) => state.username); // Get username from Redux
  const dispatch = useDispatch();
  const storedUsername = localStorage.getItem("username");

  return (
    <Router>
      <AuthChecker />
      {!username && storedUsername && (
        <div className="nav">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      )}

      <div id="registration">
        <Routes>
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
};

const AuthChecker = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.username);
  const storedUsername = localStorage.getItem("username");

  useEffect(() => {
    if (!storedUsername) {
      navigate("/login");
    }
  }, [username, navigate]);

  return null;
};

export default App;
