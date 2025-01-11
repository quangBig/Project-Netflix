import React from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { userAuthStore } from '../../store/authUser'

const HomePage = () => {
    const { user } = userAuthStore()
    return (
        <>{user ? <HomeScreen /> : <AuthScreen />}</>
    )
}

export default HomePage
