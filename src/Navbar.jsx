import "./index.css";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-sky-950 flex flex-row fixed w-full items-center z-30 h-16">
      <Link to="/" className="p-4 flex flex-row gap-2 hover:opacity-80">
        <img src="/src/assets/react.svg" alt="Tokopetei" className="w-8" />
        <h1 className="text-amber-50 font-semibold text-2xl">Tokopetei</h1>
      </Link>

      <div className="text-white ml-[10vw] mr-[2vw]">
        <input
          type="text"
          placeholder="Search"
          className="py-1.5 px-2.5 w-[40vw] rounded-lg bg-sky-900 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      <nav className="text-amber-50 flex flex-row gap-8 m-2 text-lg">
        <Link to="/" className="hover:text-amber-200">
          Home
        </Link>
        <Link to="/" className="hover:text-amber-200">
          Products
        </Link>
        <Link to="/cart" className="relative hover:text-amber-200">
          Cart
        </Link>
      </nav>

      <div className="text-white flex flex-row gap-6 ml-auto mr-12 text-lg items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:text-amber-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-amber-200">
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-amber-200">{user?.name}</span>
            <button
              onClick={logout}
              className="bg-amber-500 text-black px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
