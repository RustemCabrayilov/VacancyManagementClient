import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { useState, useEffect } from "react";
import LogIn from "./Components/LogIn/LogIn";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AddVacancy } from "./Components/Admin/Vacancy/Add/AddVacancy";
import { AddAnswer } from "./Components/Admin/Answer/Add/AddAnswer";
import Header from "./Components/Header/Header";
import AdminLogIn from "./Components/Admin/LogIn/AdminLogIn";
import { VacancyList } from "./Components/Admin/Vacancy/VacancyList";
import Interview from "./Components/Interview/Interview";
import AnswerList from "./Components/Admin/Answer/AnswerList";
import QuestionList from "./Components/Admin/Question/QuestionList";
import AddQuestion from "./Components/Admin/Question/Add/AddQuestion";
import SideBar from "./Components/Admin/SideBar/SideBar";
import Footer from "./Components/Footer/Footer";
import UserProfile from "./Components/UserProfile/UserProfile";
import UserList from "./Components/Admin/User/UserList";
import ResultList from "./Components/Admin/Result/ResultList";
import getUsernameFromToken from "./Utils/GetUsername";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // State for storing vacancies, loading, and error status
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchVacancies = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Vacancies");
      console.log(response);
      console.log(response.data["getAllVacancies"]);
      setVacancies(response.data["getAllVacancies"] || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVacancies();
  }, []);
  navigate('/login')
  var userName=getUsernameFromToken();
  userName??navigate('/home')
  return (
    <>
    {location.pathname === "/login" &&
            location.pathname === "/admin" && (
              <Header />
            )}
      <div className="container-fluid">
        <div className="container min-h-[480px]">
          <Routes>
            <Route path="/home" element={<Home vacancies={vacancies} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/admin" element={<AdminLogIn />} />
            <Route path="/interview/:vacancyId" element={<Interview />} />
            <Route path="/adminpanel/answers/add" element={<AddAnswer />} />
            <Route path="/adminpanel/questions/add" element={<AddQuestion />} />
            <Route path="/adminpanel/vacancies/add" element={<AddVacancy />} />
            <Route path="/adminpanel/vacancies" element={<VacancyList />} />
            <Route path="/adminpanel/answers" element={<AnswerList />} />
            <Route path="/adminpanel/questions" element={<QuestionList />} />
            <Route path="/adminpanel/users" element={<UserList />} />
            <Route path="/adminpanel/results" element={<ResultList />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
      {location.pathname === "/login" &&
            location.pathname === "/admin" && (
              <Footer />
            )}
      
    </>
  );
}

export default App;
