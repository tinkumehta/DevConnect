import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();
    const {register} = useContext(AuthContext);

    const [form, setForm] = useState({
        fullName : '',
        email : '' ,
        username : '',
        password: '',
    })
    const [avatar, setAvatar] = useState(null)
    const [coverImage, setCoverImage] = useState(null)

    const handleChange = (e) => 
        setForm({...form, [e.target.name] : e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => 
        formData.append(key, value)
        );
        if (avatar) formData.append('avatar', avatar);
        if (coverImage) formData.append('coverImage', coverImage);

        await register(formData);
        navigate('/');
    };


  return (
    <div className='max-w-md mx-auto p-4'>
        <h2 className='text-2xl mb-4 font-bold'>Register</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input
            name='fullName'
            placeholder='Name'
            onChange={handleChange}
            className='border p-2'
            required
            />
            <input
            name='username'
            placeholder='username'
            onChange={handleChange}
            className='border p-2'
            required
            />
            <input 
             name='email'
             type='email'
             placeholder='email..'
             onChange={handleChange}
             className='border p-2'
             required
            />
            <input
             name='password'
             type='password'
             placeholder='password'
             onChange={handleChange}
             className='border p-2'
             required
            />
            <input
             type='file'
             accept='image/*'
             onChange={(e) => setAvatar(e.target.files[0])}
             className='border p-2'
            />
            <input
             type='file'
             accept='image/*'
             onChange={(e) => setCoverImage(e.target.files[0])}
             className='border p-2'
            />
            <button 
             type='submit'
             className='bg-green-600 text-white py-2 px-4 rounded'>
                Register
             </button>
        </form>

        {avatar && (
            <div className="mt-4">
                <p>Preview:</p>
                <img
                src={URL.createObjectURL(avatar)}
                alt='Avatar Preview'
                className='w-24 h-24 rounded-full object-cover'
                />
            </div>
        )}
    </div>
  )
}

export default Register