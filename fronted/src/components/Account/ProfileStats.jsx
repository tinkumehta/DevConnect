import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import TweetCard from "../Pages/TweetCard";
import Hometweet from "../Pages/Hometweet";

function ProfileStats() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async () => {
            try {
                const res = await axios.get(`/api/v1/users/follows/${user._id}`);
                console.log(res.data.data);
                
                if (isMounted) {
                    setStats(res.data.data);
                    setError(null);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching stats:", error);
                    setError("Failed to load profile stats")
                }
            } finally{
                if (isMounted) setIsLoading(false);
            }
        };

        fetchStats();
    }, [user._id, setStats, setIsLoading]);

     if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 animate-pulse">
          <div className="flex justify-around mb-6">
            {[1, 2].map((item) => (
              <div key={item} className="text-center">
                <div className="h-8 w-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                <div className="h-5 w-20 bg-gray-100 rounded-lg mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="h-40 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <div className="text-red-500 mb-2">
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  // Safe calculation for progress bar
  const total = stats.followersCount + stats.followingCount;
  const progressPercentage = total > 0 
    ? (stats.followersCount / total) * 100 
    : 50; // Default to 50% if no followers/following

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Stats Section */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="flex justify-around">
         <img
                 src={user.avatar} alt="avatar"
                  className='w-12 h-10 rounded-full'/>
          <div className="text-center group cursor-pointer px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <p className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
              {stats.followersCount.toLocaleString()}
            </p>
            <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-500 transition-colors duration-300">
              Followers
            </p>
          </div>
          
          <div className="border-l border-gray-300 border-opacity-50"></div>
          
          <div className="text-center group cursor-pointer px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <p className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
              {stats.followingData.toLocaleString()}
            </p>
            <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-500 transition-colors duration-300">
              Following
            </p>
          </div>
        </div>
        
        {/* Progress indicator with animation */}
        <div className="mt-6 flex justify-center">
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
            <div 
              className="bg-gradient-to-r from-indigo-400 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Hometweet Section with error boundary */}
      <div className="transition-opacity duration-500 ease-in-out">
        {error ? (
          <div className="p-4 text-center text-gray-500">
            Could not load tweets
          </div>
        ) : (
          
         <Hometweet />
        )}
      </div>
      
      {/* Decorative elements with proper positioning */}
      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-10"></div>
      </div>
    </div>
  );
}

export default ProfileStats