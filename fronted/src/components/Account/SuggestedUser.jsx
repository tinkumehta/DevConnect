import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react'
//const API = import.meta.env.VITE_API_URL;
import api from "../../context/configer";

function SuggestedUser() {
    const [susggestios, setSuggestions] = useState([]);
    const [isLoading, setIsLoading]= useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
              const token = localStorage.getItem("token");
                const res = await api.get(`/users/suggestions`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
        withCredentials: true, // ✅ allow cross-origin auth
      });
                setSuggestions(res.data.data);
            } catch (error) {
                console.error("Error fetching suggstions ", error)
            } finally{
                setIsLoading(false);
            }
        };
        fetchSuggestions()
    }, []);

    const handleFollow = async (id) => {
        try {
            await api.post(`/users/follow/${id}`);
            setSuggestions((prev) => prev.filter((user) => user._id !== id))
        } catch (error) {
            console.error("Error following user:", error)
        }
    };


  return (
     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-indigo-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
          </svg>
          Who to follow
        </h2>
      </div>
      {isLoading ? (
        <div className="space-y-4 p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-full w-20"></div>
            </div>
          ))}
        </div>
      ) : susggestios.length === 0 ? (
        <div className="p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No suggestions found</h3>
          <p className="mt-1 text-sm text-gray-500">You're following everyone!</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">  
          {susggestios.map((user) => (
            <div 
              className="p-4 hover:bg-gray-50 transition-colors duration-150" 
              key={user._id}>
            <div className="flex items-center justify-between">
             <div className="flex items-center space-x-3">
                <img
                src={user.avatar}
                alt={user.username}
                 className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    onError={(e) => {
                      e.target.src = "";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500">@{user.username.toLowerCase()}</p>
                  </div>
                </div>
            <button 
              onClick={() => handleFollow(user._id)}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors duration-200 hover:shadow-sm"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

       <div className="p-4 border-t border-gray-100">
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          Show more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default SuggestedUser