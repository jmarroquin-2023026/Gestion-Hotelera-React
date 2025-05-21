import React, { useState } from 'react'
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'

export const AuthPage = () => {
    const [isLogin,setIsLogin]=useState(false)
    const handleAuthPage=()=>{
        setIsLogin((prev)=>!prev)
    }
  return (
    <div>
      {
        isLogin?(
            <Login switchAuthHandler={handleAuthPage}/>
        ):(
            <Register switchAuthHandler={handleAuthPage}/>
        )
      }
    </div>
  )
}


