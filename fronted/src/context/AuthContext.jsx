import { useEffect,createContext, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const res = await axios.get("/api/v1/users/current-user", {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
            })
            SetUser(res.data.data)
        } catch (error) {
            SetUser(null)
        } finally{
            setLoading(false)
        }
    };

    const refreshUser = async () => {
        await getCurrentUser();
    }

    const register = async (formData) => {
        const res = await axios.post('/api/v1/users/register', formData, {
            headers : { 'Content-Type' : 'multipart/form-data'},
        });
        await getCurrentUser();
    };

    const login = async (emailOrUsername, password) => {
        try {
            const res = await axios.post('/api/v1/users/login', {
                email : emailOrUsername.includes('@') ? emailOrUsername : undefined,
                username : !emailOrUsername.includes('@') ? emailOrUsername : undefined,
                password,
            });

            SetUser(res.data.data);
            navigate('/');
        } catch (error) {
            throw error.response?.data?.message || "Login failed"
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/v1/users/logout');
            SetUser(null);
            navigate('/login')
        } catch (error) {
            console.error('Logout error', error)
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCurrentUser();
        } else{
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{loading, SetUser, user, refreshUser, login, logout,register}}>
            {children}
        </AuthContext.Provider>
    )
}