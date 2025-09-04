import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../assets/log.png"

import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon, HomeIcon, MagnifyingGlassIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/outline'

function Header() {
    const { user, logout, loading } = useContext(AuthContext)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation();

    // Check if current path matches
    const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              alt="Twitter Logo"
              src={logo}
              className="h-18 w-30 transition-transform duration-300 group-hover:scale-105"
            />
           
          </Link>
        </div>

        {/* Desktop Navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          <Link 
            to="/" 
            className={`flex items-center gap-1 text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
              isActive('/') 
                ? 'text-blue-600 bg-blue-50 shadow-inner' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          
          <Link 
            to="/search" 
            className={`flex items-center gap-1 text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
              isActive('/search') 
                ? 'text-blue-600 bg-blue-50 shadow-inner' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            Search
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex items-center gap-1 text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
              isActive('/profile') 
                ? 'text-blue-600 bg-blue-50 shadow-inner' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            Profile
          </Link>
          
          <Link 
            to="/suggestions" 
            className={`flex items-center gap-1 text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
              isActive('/suggestions') 
                ? 'text-blue-600 bg-blue-50 shadow-inner' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <SparklesIcon className="w-5 h-5" />
            Suggestions
          </Link>
        </PopoverGroup>

        {/* User Section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
            {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full pl-1 pr-4 py-1 shadow-sm">
                    <img 
                      src={user.avatar} 
                      alt={user.fullName} 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                    <span className="font-medium text-gray-800">{user.fullName}</span>
                  </div>
                  <button 
                    onClick={logout} 
                    className="text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Logout
                  </button>
                </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign up
                </Link>
              </div>
            )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu dialog */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transform transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                alt="Twitter Logo"
                src={logo}
                className="h-10 w-auto"
              />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                SocialHub
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200/10">
              <div className="space-y-4 py-6">
                <Link 
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 -mx-3 rounded-lg px-3 py-3 text-base font-semibold transition-all duration-300 ${
                    isActive('/') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <HomeIcon className="w-6 h-6" />
                  Home
                </Link>
               
                <Link 
                  to="/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 -mx-3 rounded-lg px-3 py-3 text-base font-semibold transition-all duration-300 ${
                    isActive('/search') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                  Search
                </Link>
                
                <Link 
                  to="/suggestions"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 -mx-3 rounded-lg px-3 py-3 text-base font-semibold transition-all duration-300 ${
                    isActive('/suggestions') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <SparklesIcon className="w-6 h-6" />
                  Suggestions
                </Link>
                
                <Link 
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 -mx-3 rounded-lg px-3 py-3 text-base font-semibold transition-all duration-300 ${
                    isActive('/profile') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <UserIcon className="w-6 h-6" />
                  Profile
                </Link>
              </div>
              
              <div className="py-6">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                      <img 
                        src={user.avatar} 
                        alt={user.fullName} 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left font-semibold text-white bg-red-500 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link 
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300 px-3 py-2.5"
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default Header