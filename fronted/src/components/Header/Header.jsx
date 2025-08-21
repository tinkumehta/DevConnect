import React,{useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import logo from "../../assets/log.png"

import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon,} from '@heroicons/react/24/outline'

function Header() {
    const {user, logout, loading} = useContext(AuthContext)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Twitter</span>
            <img
              alt=""
              src={logo}
              className="h-12 w-23"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className='text-sm/6 font-semibold text-gray-900'>
          Home
          </Link>
          
          <Link to="/search" className='text-sm/6 font-semibold text-gray-900'>
          Search
          </Link>
          <Link to="/profile" className='text-sm/6 font-semibold text-gray-900'>
          Profile
          </Link>
          <Link to="/suggestions" className='text-sm/6 font-semibold text-gray-900'>
          Suggestions
          </Link>
          
         
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
                <div className="flex gap-4 items-center">
                 
                  <span className='font-semibold italic gap-3'>{user.fullName}</span>
                  <button onClick={logout} className='cursor-pointer m-3'>Logout</button>
                </div>
            ) : (

           
          <Link to="/login" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
           )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Twitter</span>
              <img
                alt=""
                src={logo}
                className="h-10 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                
                <Link to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
               
                <Link to="/search"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Search
                </Link>
                <Link to="/suggestions"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Suggestion
                </Link>
                <Link to="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </Link>
                
                
              </div>
              <div className="py-6">
                {user ? (
                    <div className="flex gap-4 items-center">
                <img src={user.avatar} alt="avatar"
                 className="w-10 h-9 rounded-full"/>
                <span className='flex  font-bold'>{user.username}</span>
                <button onClick={logout} className='flex items-center hover:bg-gray-50 font-bold cursor-pointer'>Logout</button>
             </div>
                ) : (

                
                <Link to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
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