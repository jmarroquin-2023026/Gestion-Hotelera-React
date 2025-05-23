import React, { useState } from 'react'
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'
import "../index.css"

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleAuthPage = () => {
    setIsLogin(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {isLogin ? (
        <Login switchAuthHandler={handleAuthPage} />
      ) : (
        <Register switchAuthHandler={handleAuthPage} />
      )}
    </div>
  )
}
