import React, { useState } from 'react'
import { getHotelsRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useHotels = () => {
    const [hotels, setHotels] = useState({hotels:[]})

    const getHotels = async (isLogged = false) => {
        const hotelsData = await getHotelsRequest()
        if (hotelsData.error) {
            return toast.error(
                hotelsData?.e?.response?.data ||
                'Error al obtener los hoteles'
            )
        }
        console.log(hotelsData)
        if (!isLogged) {
            return setHotels(
                {
                    hotels: hotelsData.data.hotel
                }
            )
        }
        setHotels(
            {
                hotels: hotelsData.data.hotel
            }
        )
    }


    return {
        getHotels,
        isFetching: !hotels,
        allHotels: hotels?.hotels || []
    }
}

