import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Toaster } from 'react-hot-toast'
import { userAuthStore } from './store/authUser.js'
import { Loader } from 'lucide-react'
import WatchPage from './pages/WatchPage.jsx'
import Footer from './components/Footer.jsx'
import SearchPage from './pages/SearchPage.jsx'
import SearchHistoryPage from './pages/SearchHistoryPage.jsx'
import Contact from './pages/Contact.jsx'
import UserPage from './pages/user/UserPage.jsx'
import FavoritePage from './pages/user/FavoritePage.jsx'
import ChangePass from './pages/user/ChangePass.jsx'
// import FavoritesPage from './pages/FavoritesPage.jsx'
// import Favorites from './pages/Profile/Favorites.jsx'


function App() {
  const { user, isCheckingAuth, authCheck } = userAuthStore()
  console.log("auth user is here: ", user);
  useEffect(() => {
    authCheck()
  }, [authCheck])
  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />}></Route>
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />}></Route>
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} ></Route>
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/login" />} ></Route>
        <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
        <Route path='/contact' element={user ? <Contact /> : <Navigate to={"/login"} />} />
        <Route path='/user' element={user ? <UserPage /> : <Navigate to={"/login"} />} />

        <Route path="/favorites" element={user ? <FavoritePage /> : <Navigate to={"/login"} />} />
        <Route path="/password" element={user ? <ChangePass /> : <Navigate to={"/login"} />} />
        {/* <Route path="/watch/:id" element={<WatchPage />} /> */}
        {/* <Route path='/favorites' element={user ? <Favorites /> : <Navigate to={"/login"} />} /> */}
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
