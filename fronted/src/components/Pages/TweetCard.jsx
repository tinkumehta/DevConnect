import React, { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
// const API = import.meta.env.VITE_API_URL;

function TweetCard({tweet, onDelete, onEdit}) {
    const {user} = useContext(AuthContext);
    const handleDelete = async () => {
        try {
          const token = localStorage.getItem("token");
            await axios.delete(`/api/v1/tweets/${tweet._id}`,{
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
        withCredentials: true, // ✅ allow cross-origin auth
      });
            onDelete(tweet._id);
        } catch (error) {
            console.error("Delete failed ", error);
        }
    }
  //  console.log(tweet);
    
  return (
    <div className='border rounded p-4 mb-4 shadow'>
     <div className='flex justify-between'>
        <h3 className='text-sm text-gray-500 '>
           {new Date(tweet.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
          })}
        </h3>
     </div> 
     <p className="my-2">{tweet.content}</p> 
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>❤️ {tweet.likesCount}</span>
        {tweet.ownerDetails?._id === user?._id && (
          <div className="space-x-2">
            <button onClick={() => onEdit(tweet)} className="text-blue-500 hover:underline">Edit</button>
            <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TweetCard