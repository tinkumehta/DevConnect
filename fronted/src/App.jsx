import { useState , useEffect} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {
  ProtectedRoute,
  Header, Login, Register, Footer,
  SearchUser, SuggestedUser,
  AllTweet
} from './components/index'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route 
       path='/login' 
       element={<Login />}
        />
      <Route
       path='/register' 
       element={<Register />}
       />
      <Route 
       path='/search' 
       element={
        <ProtectedRoute>
          <SearchUser/>
          </ProtectedRoute>}
        />
      <Route
       path='/'
       element={
        <ProtectedRoute>
          <AllTweet/>
        </ProtectedRoute>
       }
      />
    </Routes>
    </>
  )
}

export default App
