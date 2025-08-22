
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {
  ProtectedRoute,
  Header, Login, Register, Footer,
  SearchUser, SuggestedUser,
  AllTweet, ProfileStats,
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
      <Route
       path='/suggestions'
       element={
        <ProtectedRoute>
          <SuggestedUser />
        </ProtectedRoute>
       }
      />
      <Route 
       path='/profile'
       element={
        <ProtectedRoute>
          <ProfileStats/>
        </ProtectedRoute>
       }
      />
    </Routes>
    <Footer />
    </>
  )
}

export default App
