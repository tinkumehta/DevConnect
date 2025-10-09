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
  const res = await axios.post(`${API}/api/v1/users/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  await getCurrentUser();
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
         await axios.post(`${API}/api/v1/users/logout`);
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