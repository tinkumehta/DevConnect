import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import TweetCard from './TweetCard'
import TweetForm from './TweetForm'
import { AuthContext } from '../../context/AuthContext'

function Hometweet() {
    const [tweets, setTweets] = useState([]);
    const [editingTweet, setEditingTweet] = useState([]);
    const {user} = useContext(AuthContext);

    const fetchTweets = async () => {
        try {
            const res = await axios.get(`/api/v1/tweets/user/${user._id}`);
            setTweets(res.data.data);
        } catch (error) {
            console.error("Failed to fetch tweets", error)
        }
    }

    useEffect(() => {
        if (user) fetchTweets();
    }, [user])

    const handleTweet = (newTweet) => {
        newTweet.ownerDetails = {
            _id : user._id,
            username : user.username,
        };
        setTweets((prev) => {
            const updated = editingTweet ? prev.map((t) =>
                 (t._id === newTweet._id ? newTweet : t)) :
                         [newTweet, ...prev];
            return updated
        });
        setEditingTweet(null);

    };

    const handleDelete = (id) => {
        setTweets((prev) => prev.filter((t) => t._id !== id))
    }


  return (
    <div className='max-w-xl mx-auto mt-6 px-4'>
        <TweetForm 
         onTweet={handleTweet}
         editingTweet={editingTweet}
         onCancel={() => setEditingTweet(null)}
         />
         {tweets.map((tweet) => (
            <TweetCard 
               key={tweet._id}
               tweet={tweet} 
               onDelete={handleDelete}
               onEdit={setEditingTweet} />
         ))}
    </div>
  )
}

export default Hometweet