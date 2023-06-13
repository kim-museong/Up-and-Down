import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";
import InforcePage from "./pages/EnforcePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/playgame">
        <Route path="UpAndDown" element={<MainPage />} />
        <Route path="Enforce" element={<InforcePage />} />
      </Route>
    </Routes>
  );
};

export default App;
