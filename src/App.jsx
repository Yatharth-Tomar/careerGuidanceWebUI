import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";

import HomePage from "./Pages/HomePage";
import AboutUS from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/aboutUs" element={<AboutUS />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
