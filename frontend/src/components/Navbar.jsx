import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Generator", path: "/dashboard#generator" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0f1f]/90 backdrop-blur-md border-b border-[#00ffcc]/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-[#00ffcc] text-2xl font-bold cursor-pointer tracking-wide hover:text-[#00e6b8] transition"
        >
          <span className="text-[#0099ff]">Passm</span>
        </h1>

        {/* Show dashboard links if logged in */}
        { user ? (
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <button key={link.path} onClick={() => navigate(link.path)} className={`${ location.pathname === link.path ? "text-[#0099ff]" : "text-blue-300 hover:text-[#0099ff]"} font-medium transition cursor-pointer`}>
                {link.label}
              </button>
            ))}
            <button onClick={() => { logout(); navigate("/"); }} className="px-3 py-1 rounded-lg border border-blue-300/30 text-blue-300 hover:bg-blue-300/10 cursor-pointer transition ml-4">
              Logout
            </button>
          </div>
        ) : (
          // Show Login/Register if NOT logged in
          <div>
            <button
              onClick={() => navigate("/register")}
              className="px-3 py-1 rounded-lg border border-blue-300/30 text-blue-300 hover:bg-blue-300/10 cursor-pointer transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 rounded-lg border border-blue-300/30 text-blue-300 hover:bg-blue-300/10 cursor-pointer transition ml-4"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
