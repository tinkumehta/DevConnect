import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "./configer"; // Use your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const res = await api.get('/users/current-user'); // Use api instance
            
            // Check based on your backend response structure
            if (res.data && res.data.data) {
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
            // Use FormData for file uploads
            const res = await api.post('/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Check your backend response structure
            if (res.data && res.data.data) {
                // Your backend returns tokens in data field
                if (res.data.data.accessToken) {
                    localStorage.setItem('token', res.data.data.accessToken);
                    // Update axios instance header
                    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accessToken}`;
                }
                
                // Set user from response
                setUser(res.data.data.user || res.data.data);
                navigate('/');
                return { success: true, data: res.data };
            }
        } catch (error) {
            console.error("Registration error:", error);
            throw error.response?.data?.message || 
                   error.response?.data?.data?.message || 
                   "Registration failed";
        }
    };

    const login = async (emailOrUsername, password) => {
        try {
            // Determine if input is email or username
            const isEmail = emailOrUsername.includes('@');
            const payload = {
                password,
            };
            
            if (isEmail) {
                payload.email = emailOrUsername;
            } else {
                payload.username = emailOrUsername;
            }

            const res = await api.post('/users/login', payload);
            
            // Based on your backend response
            if (res.data && res.data.data) {
                // Store tokens
                if (res.data.data.accessToken) {
                    localStorage.setItem('token', res.data.data.accessToken);
                    // Update axios instance header
                    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accessToken}`;
                }
                
                // Set user
                setUser(res.data.data.user || res.data.data);
                navigate('/');
                return { success: true, data: res.data };
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error.response?.data?.message || 
                   error.response?.data?.data?.message || 
                   "Login failed";
        }
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } catch (error) {
            console.error('Logout API error', error);
        } finally {
            // Clear everything
            setUser(null);
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            navigate('/login');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Set token in axios headers
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};