import React, { useState } from 'react'
import { addHotelRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useAddHotel = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const addHotel = async (formData) => {
        setIsLoading(true)
        const response = await addHotelRequest(formData)
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
                'Error al agregar hotel, intenta de nuevo'
            )
        }
        setError(false)
        return toast.success('Registro Exitoso')
    }

    return {
        addHotel,
        isLoading,
        error,
        setError
    }
}
