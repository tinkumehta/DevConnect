import { useContext, createContext, useEffect, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const res = await axios.get('/api/v1/users/current-user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            if (res.data.success) {
                setUser(res.data.data);
            } else {
                setUser(null);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
            setUser(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        await getCurrentUser();
    }

    const register = async (formData) => {
        try {
            const res = await axios.post('/api/v1/users/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            if (res.data.success) {
                // Store the token if available in register response
                if (res.data.data.accessToken) {
                    localStorage.setItem('token', res.data.data.accessToken);
                }
                setUser(res.data.data.user || res.data.data);
                navigate('/');
            }
        } catch (error) {
            throw error.response?.data?.message || "Registration failed";
        }
    };

    const login = async (emailOrUsername, password) => {
        try {
            const res = await axios.post('/api/v1/users/login', {
                email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
                username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
                password,
            });

            if (res.data.success) {
                // Store the access token
                localStorage.setItem('token', res.data.data.accessToken);
                setUser(res.data.data.user);
                navigate('/');
            }
        } catch (err) {
            throw err.response?.data?.message || "Login failed";
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/v1/users/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } catch (error) {
            console.error('Logout API error', error);
        } finally {
            // Always clear local state regardless of API call success
            setUser(null);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            loading, 
            user, 
            setUser, 
            refreshUser, 
            login, 
            register, 
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};