import React, { useState } from 'react'
import { registerRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const register = async (formData) => {
        setIsLoading(true)
        const response = await registerRequest(formData)
        setIsLoading(false)

        if (response.error) {
            setError(true)
            if (response?.e?.response?.data?.errors) {
                const arrayErrors = response?.e?.response?.data?.errors
                for (const error of arrayErrors) {
                    return toast.error(error.msg)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error general al intentar registrar el usuario. Intente de nuevo'
            )
        }

        setError(false)
        return toast.success('Registro Exitoso')
    }

    return {
        register,
        isLoading,
        error,
        setError
    }
}
