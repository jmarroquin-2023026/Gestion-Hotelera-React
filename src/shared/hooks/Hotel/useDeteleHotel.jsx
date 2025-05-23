import React, { useState } from 'react'
import { deleteHotelRequest } from '../../../services/api'

export const useDeteleHotel = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const deleteHotel = async (id) => {
        setIsLoading(true)
        const response = await deleteHotelRequest(id)
        setIsLoading(false)

        if (response.error) {
            setError(true)
            if (response?.e?.response?.data?.errors) {
                const arrayErrors = response?.e?.response?.data?.errors
                for (const error of arrayErrors) {
                    toast.error(error.msg)
                }
            } else {
                toast.error(
                    response?.e?.response?.data?.msg ||
                    response?.e?.data?.msg ||
                    'Error al eliminar hotel'
                )
            }
            return false
        }

        setError(false)
        toast.success('Hotel eliminado correctamente')
        return true
    }

    return {
        deleteHotel,
        isLoading,
        error,
        setError

    }
}


