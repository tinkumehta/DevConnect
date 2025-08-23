import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
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
               
                
                if (isMounted) {
                    setStats(res.data.data);
                  //   console.log(res.data.data);
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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
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
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
                <div className="text-red-500 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-gray-700 font-medium">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium shadow-sm"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!stats) return null;

    const total = stats.followersCount + stats.followingCount;
    const progressPercentage = total > 0 
        ? (stats.followersCount / total) * 100 
        : 50;

    return (
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            {/* Header with user info */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-center mb-2">
                    <img
                        src={user.avatar} 
                        alt="avatar"
                        className="w-16 h-16 rounded-full border-4 border-white border-opacity-30 shadow-md"
                    />
                </div>
                <h2 className="text-xl font-bold text-center">{user.name || user.username}</h2>
                <p className="text-indigo-100 text-sm text-center">@{user.username}</p>
            </div>
            
            {/* Stats Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="flex justify-around">
                    <div className="text-center group cursor-pointer px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <p className="text-3xl font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors duration-300">
                            {stats.followersCount.toLocaleString()}
                        </p>
                        <p className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300 mt-1">
                            Followers
                        </p>
                    </div>
                    
                    <div className="border-l border-indigo-300 border-opacity-50 my-2"></div>
                    
                    <div className="text-center group cursor-pointer px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <p className="text-3xl font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors duration-300">
                            {stats.followingData.toLocaleString()}
                        </p>
                        <p className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300 mt-1">
                            Following
                        </p>
                    </div>
                </div>
                
                {/* Progress indicator with animation */}
                <div className="mt-6 flex justify-center">
                    <div className="w-full bg-gray-200 rounded-full h-3 max-w-xs shadow-inner">
                        <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-md" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
                <div className="flex justify-between text-xs text-indigo-700 mt-2 px-2 max-w-xs mx-auto">
                    <span>Followers</span>
                    <span>Following</span>
                </div>
            </div>
            
            {/* Hometweet Section */}
            <div className="transition-opacity duration-500 ease-in-out">
                {error ? (
                    <div className="p-4 text-center text-gray-500 bg-gray-50">
                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Could not load tweets</p>
                    </div>
                ) : (
                    <Hometweet />
                )}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-20"></div>
        </div>
    );
}

export default ProfileStats;