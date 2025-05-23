import { useEffect, useState } from 'react'
import { getHotelRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useHotelDetails = (id) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hotel, setHotel] = useState(null)

  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoading(true)
      setError(null)

      const response = await getHotelRequest(id)
      if (response.error) {
        setError(response.e)
        toast.error(
          response?.e?.response?.data?.message ||
          'Error al obtener el detalle del hotel'
        )
      } else {
        setHotel(response.data.hotel)
      }

      setIsLoading(false)
    }

    if (id) {
      fetchHotel()
    }
  }, [id])

  return {
    hotel,
    isLoading,
    error,
  }
}
