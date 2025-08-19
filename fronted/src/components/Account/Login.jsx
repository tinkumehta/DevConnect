import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Login() {
 const {login} = useContext(AuthContext);
 const [emailOrUsername, setEmailOrUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(emailOrUsername, password);
    } catch (error) {
        setError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Please login to your account
        </p>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
        <input
        type='text'
        placeholder='Enter your email or username'
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
        />
       </div>
       <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
             
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md"
          >
            Log In
          </button>
      </form>
      <p className="text-sm text-center text-gray-500">
        Don't have an account?{' '}
        <a href='/register' className='text-purple-600 font-medium hover:underline'>
        Register Now
        </a>
      </p>
      </div>
      </div>
  )
}

export default Login