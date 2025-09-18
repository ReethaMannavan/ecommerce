import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/scroll/ScrollToTop";

import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Cart from "./components/productlist/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen font-roboto">
          <main>
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              <Route path="/product/:id" element={<ProductDetailsPage />} />

              <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage/>
                </ProtectedRoute>
              }
            />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
