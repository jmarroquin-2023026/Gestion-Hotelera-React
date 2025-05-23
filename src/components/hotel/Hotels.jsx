import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { HotelCard } from './HotelCard'

export const Hotels = () => {
    const { hotels } = useOutletContext()

    return (
        <div>
            {hotels.map((hotel) => (
                <HotelCard
                    key={hotel._id}
                    id={hotel._id}
                    name={hotel.name}
                    address={hotel.address}
                    category={hotel.category}
                    amenities={hotel.amenities}
                    reviews={hotel.reviews}
                    reservations={hotel.reservations}
                    photos={hotel.photos}
                    navigateToHotelHandler={() => {}}
                />
            ))}
        </div>
    )
}
