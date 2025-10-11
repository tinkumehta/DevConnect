import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ Create the Context
export const AuthContext = createContext();

// ✅ Backend base URL (adjust if needed)
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://your-backend-url.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚙️ Configure Axios
  axios.defaults.withCredentials = true; // allow cookies
  axios.defaults.baseURL = API_BASE_URL;

  // ✅ Fetch current user (auto-login if token cookie exists)
  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/v1/users/current-user");
      setUser(res.data.data); // assuming ApiResponse(data, message)
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // ✅ Register
  const register = async (formData) => {
    try {
      const res = await axios.post("/api/v1/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.data.user);
      return res.data.data.user;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error.response?.data?.message || "Registration failed";
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/api/v1/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUser(res.data.data.user);
      return res.data.data.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error.response?.data?.message || "Login failed";
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use auth easily
export const useAuth = () => useContext(AuthContext);
