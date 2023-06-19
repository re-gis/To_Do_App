import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ToDo from "./components/ToDo";
import axios from "axios";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";



axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/login"element={<LoginPage />} />
            <Route path="/signup"element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
