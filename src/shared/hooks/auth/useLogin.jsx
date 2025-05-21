import { useState } from "react";
import toast from 'react-hot-toast'

import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../../services/api";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const login = async(userLogin, password)=> {
        setIsLoading(true)
        const user = {
          userLogin,
          password
        }
        const response = await loginRequest(user)
        setIsLoading(false)
    
        if (response.error) {
        return toast.error(
            response?.e?.response?.data?.message ||
            'Error general al intentar logearse. Intenta de nuevo.'
            )
        }

        navigate('/a')
    }

  return {
    login, 
    isLoading
  }
}