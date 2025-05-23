import React, { useState } from 'react'
import { updateHotelRequest } from '../../../services/api' // Asegúrate de tener esta función
import toast from 'react-hot-toast'

export const useUpdateHotel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateHotel = async (id, formData) => {
    setIsLoading(true)
    const response = await updateHotelRequest(id, formData)
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
          'Error al actualizar hotel, intenta de nuevo'
        )
      }
      return false
    }

    setError(false)
    toast.success('Hotel actualizado correctamente')
    return true
  }

  return {
    updateHotel,
    isLoading,
    error,
    setError
  }
}
