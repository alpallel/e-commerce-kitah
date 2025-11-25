import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ProductList from "./ProductList.jsx";
import CartPage from "./pages/CartPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SelectionProvider } from "./context/SelectionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <SelectionProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <App />
                    <ProductList />
                  </>
                }
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </Router>
        </SelectionProvider>
      </AuthProvider>
    </CartProvider>
  </StrictMode>
);
