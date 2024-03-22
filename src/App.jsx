import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";

import HomePage from "./Pages/HomePage";
import AboutUS from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CourseList from "./Pages/Courses/CourseList";
import Denied from "./Pages/Denied";
import CourseDesciption from "./Pages/CourseDescription";
import RequireAuth from "./Components/Auth/RequireAuth";
import CreateCourse from "./Pages/Courses/CreateCourse";
import Profile from "./Pages/User/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/aboutUs" element={<AboutUS />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="courses" element={<CourseList />}></Route>
        <Route
          path="/courses/description"
          element={<CourseDesciption />}
        ></Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />}></Route>
        </Route>

        <Route path="/denied" element={<Denied />}></Route>
      </Routes>
    </>
  );
}

export default App;
