import React, { useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import FollowButton from './FollowButton'

function SearchUser() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Debounce timer
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                fetchSearchResults();
            } else {
                setResults([]); // clear if query empty
            }
        }, 400); 

        return () => clearTimeout(timer);
    }, [query]);

    const fetchSearchResults = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/v1/users/search?query=${query}`, {
                headers : {Authorization : `Bearer ${localStorage.getItem('token')}`},
            });
            setResults(res.data.data);
        } catch (error) {
            console.error("Search error", error)
        } finally {
            setIsLoading(false);
        }
    };

    const handleFollowChange = (userId, isNowFollowing) => {
        setResults((prev) => 
            prev.map((u) =>
              u._id === userId ? {...u, isFollowing : isNowFollowing} : u) )
    }


  return (
 <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover Users</h2>
      
      <div className="relative mb-6">
        <input
         type='text'
         placeholder='Search users...'
         value={query}
         onChange={(e) => setQuery(e.target.value)}
className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3">
            {results.map((user) => (
                <div 
                    key={user._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                 src={user.avatar}
                 alt={user.username}
                 className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40";
                  }}
                />
                <div>
                  <p className="font-medium text-gray-800">{user.username}</p>
                  <p className="text-xs text-gray-500">@{user.username.toLowerCase().replace(/\s+/g, '')}</p>
                </div>
              </div>
              <FollowButton
              targetUserId={user._id}  
              onFollowChange={(isNowFollowing) => 
                handleFollowChange(user._id, isNowFollowing)
              }
              className='px-4 py-1.5 text-sm rounded-full'
            />
            </div>
            ))}
        </div>
      ) : query ? (
        
      )}
  )
}

export default SearchUser