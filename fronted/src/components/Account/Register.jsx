import React, { useContext, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiCamera, FiImage, FiUpload, FiX } from 'react-icons/fi'

function Register() {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const avatarRef = useRef(null);
    const coverRef = useRef(null);

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
    })
    const [avatar, setAvatar] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => 
        setForm({...form, [e.target.name]: e.target.value})

    const handleAvatarClick = () => {
        avatarRef.current?.click();
    };

    const handleCoverClick = () => {
        coverRef.current?.click();
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
        }
    };

    const removeAvatar = () => {
        setAvatar(null);
        if (avatarRef.current) {
            avatarRef.current.value = '';
        }
    };

    const removeCover = () => {
        setCoverImage(null);
        if (coverRef.current) {
            coverRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => 
            formData.append(key, value)
        );
        if (avatar) formData.append('avatar', avatar);
        if (coverImage) formData.append('coverImage', coverImage);

        try {
            await register(formData);
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Join Our Community</h2>
                    <p className="text-blue-100">Create your account and start connecting</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                        <FiUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Username */}
                    <div className="relative">
                        <FiUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FiMail className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            name="email"
                            type="email"
                            placeholder="Email address"
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FiLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            name="password"
                            type="password"
                           
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Avatar Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div 
                                    onClick={handleAvatarClick}
                                    className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer flex items-center justify-center bg-gray-50 transition-all duration-200 hover:bg-blue-50"
                                >
                                    {avatar ? (
                                        <img
                                            src={URL.createObjectURL(avatar)}
                                            alt="Avatar preview"
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FiCamera className="text-gray-400 text-xl" />
                                    )}
                                </div>
                                {avatar && (
                                    <button
                                        type="button"
                                        onClick={removeAvatar}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <FiX className="w-3 h-3" />
                                    </button>
                                )}
                                <input
                                    ref={avatarRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={handleAvatarClick}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    <FiUpload className="w-4 h-4" />
                                    {avatar ? 'Change' : 'Upload'} Avatar
                                </button>
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF</p>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-blue-50">
                            <div 
                                onClick={handleCoverClick}
                                className="flex flex-col items-center justify-center"
                            >
                                {coverImage ? (
                                    <div className="relative w-full">
                                        <img
                                            src={URL.createObjectURL(coverImage)}
                                            alt="Cover preview"
                                            className="w-full h-32 object-cover rounded-lg mb-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeCover}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                        >
                                            <FiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <FiImage className="text-gray-400 text-2xl mb-2" />
                                        <p className="text-sm text-gray-600 text-center">
                                            Click to upload cover image
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Recommended: 1200×300 pixels</p>
                                    </>
                                )}
                            </div>
                            <input
                                ref={coverRef}
                                type="file"
                                accept="image/*"
                                onChange={handleCoverChange}
                                className="hidden"
                            />
                            {coverImage && (
                                <button
                                    type="button"
                                    onClick={handleCoverClick}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm mx-auto mt-2"
                                >
                                    <FiUpload className="w-4 h-4" />
                                    Change Cover
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Creating Account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-gray-600 text-sm">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                        >
                            Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register