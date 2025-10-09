import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
const API = import.meta.env.VITE_API_URL;

function TweetForm({onTweet, editingTweet, onCancel}) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingTweet) setContent(editingTweet.content);
  }, [editingTweet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTweet) {
        const res = await axios.patch(`${API}/api/v1/tweets/${editingTweet._id}`, {content});
        onTweet(res.data.data);
      } else{
        const res = await axios.post(`${API}/api/v1/tweets/`, {content});
        onTweet(res.data.data);
      }
      setContent('');
    } catch (error) {
      console.error("Tweet error" || error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <textarea 
       value={content}
       onChange={(e) => setContent(e.target.value)}
       placeholder='what happening...'
       className='w-full p-2 border rounded resize-none'
       />
      <div className="flex justify-between mt-2">
        <button
         type='submit'
         className='bg-blue-500 text-white px-4 py-1 rounded'>
          {editingTweet ? 'Updated' : 'Tweet'}
         </button>
         {editingTweet && (
          <button 
           type='button'
           onClick={onCancel}
           className='text-gray-600 underline'>
            Cancel
           </button>
         )}
      </div>
    </form>
  )
}

export default TweetForm