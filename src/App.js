import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />

      <Route path="/playgame" element={<MainPage />} />
    </Routes>
  );
};

export default App;
