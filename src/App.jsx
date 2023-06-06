import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ToDo from "./components/ToDo";
import Update from "./components/Update";
import axios from "axios";



axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<ToDo />} />
            <Route path="/update" element={<Update />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
