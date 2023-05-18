import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ToDo from "./components/ToDo";
import Update from "./components/Update";

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
