import { useContext, createContext, useEffect, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const API = import.meta.env.VITE_API_URL;


export const AuthContext = createContext();

 export const AuthProvider = ({children}) => {
    const [user , SetUser] = useState(null);
    const [loading, setLoading] = useState(true);
   const navigate = useNavigate();


    const refreshUser = async () => {
       await getCurrentUser();
    }

 const register = async (formData) => {
  try {
    const res = await axios.post(`${API}/api/v1/users/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true, // allow cookies if backend sets them
    });
    
    // Save token if backend returns it
    localStorage.setItem("token", res.data.data.accessToken);

    await getCurrentUser();
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    throw err.response?.data?.message || "Registration failed";
  }
};


const login = async (emailOrUsername, password) => {
  const res = await axios.post(`${API}/api/v1/users/login`, {
    email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
    username: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
    password,
  });

  SetUser(res.data.data.user);
  navigate("/");
};

const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${API}/api/v1/users/current-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    SetUser(res.data.data);
  } catch (err) {
    SetUser(null);
  } finally {
    setLoading(false);
  }
};

    const logout = async () => {
       try {
        const token = localStorage.getItem("token");
         await axios.post(`${API}/api/v1/users/logout`,{}, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
        withCredentials: true, // ✅ allow cross-origin auth
      });
        SetUser(null);
        navigate('/login')
       } catch (error) {
        console.error('Logout error', error)
       }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{loading, SetUser,refreshUser, login, register, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
 }