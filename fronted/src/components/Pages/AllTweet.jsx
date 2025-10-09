import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const API = import.meta.env.VITE_API_URL;
dayjs.extend(relativeTime);

const AllTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchTweets = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, user not logged in");
      return; // stop here
    }

    const res = await axios.get(`${API}/api/v1/tweets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    setTweets(res.data.data);
  } catch (err) {
    console.error("Failed to fetch tweets", err);
  }
};


  fetchAllTweets();
}, []);


  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 px-2">Latest Tweets</h1>
      {tweets.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No tweets yet</h3>
          <p className="mt-1 text-gray-500">Be the first to share something!</p>
        </div>
      ) : (
        tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
      )}
    </div>
  );
};

const TweetCard = ({ tweet }) => {
  const [likesCount, setLikesCount] = useState();
  const [isLiked, setIsLiked] = useState(tweet.isLiked || false);
  const [animate, setAnimate] = useState(false);
  
  const handleLikeToggle = async () => {
  try {
    const token = localStorage.getItem("token");

    // ✅ Correct axios syntax — send empty body, then config with headers
    const res = await axios.post(
      `${API}/api/v1/likes/toggle/t/${tweet._id}`,
      {}, // empty body (POST requires a body)
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token correctly
        },
        withCredentials: true, // ✅ allow cookies if needed
      }
    );
    console.log(res.data.data);
    //console.log(tweet.likeCount);
    

    const liked = res.data.data.likedBy;
    console.log(liked);

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    setIsLiked(liked);
    setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    
  } catch (err) {
    console.error("Error toggling like:", err);
  }
};


  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border border-gray-100">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img 
            src={tweet.ownerDetails?.avatar || ""} 
            alt="Profile" 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
           
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {tweet.ownerDetails?.fullName || "Unknown"}
              </h3>
              <p className="text-gray-500 text-sm">
                @{tweet.ownerDetails?.username || "unknown"} · {dayjs(tweet.createdAt).fromNow()}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>

          <p className="mt-2 text-gray-800 whitespace-pre-wrap">
            {tweet.content}
          </p>

          <div className="mt-4 flex items-center gap-6 text-gray-500">
            <button 
              onClick={handleLikeToggle}
              className={`flex items-center gap-1 transition-all duration-200 ${
                isLiked ? "text-red-500" : "hover:text-red-500"
              } ${animate ? "scale-110" : "scale-100"}`}
            >
              <svg 
                className={`w-5 h-5 ${isLiked ? "fill-current" : "stroke-current"}`} 
                viewBox="0 0 24 24"
                strokeWidth={isLiked ? "0" : "2"}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{tweet.likeCount}</span>
              
            </button>

            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">{tweet.commentsCount || 0}</span>
            </button>

            <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
              <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTweets;