import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="h-screen">
      <Router>
        <div className="h-1/9">
          <Navbar />
        </div>
        <div className="h-8/9">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}
