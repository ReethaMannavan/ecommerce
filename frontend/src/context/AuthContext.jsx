
import { createContext, useState } from "react";
import API from "../api/api";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import for your version

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(
    authTokens ? jwtDecode(authTokens.access) : null
  );

  const loginUser = async (email, password) => {
    try {
      const res = await API.post("auth/login/", { email, password });
      setAuthTokens(res.data);
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      setUser(jwtDecode(res.data.access));

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Invalid email or password" };
    }
  };

  const registerUser = async (username, email, password, confirmPassword) => {
    try {
      await API.post("auth/register/", {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });
      return { success: true };
    } catch (err) {
      console.error("Register error:", err);
      return { success: false, message: "Registration failed" };
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return (
    <AuthContext.Provider
      value={{ user, authTokens, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};


