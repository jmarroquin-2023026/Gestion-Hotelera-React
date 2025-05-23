import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { HotelCard } from './HotelCard'

export const Hotels = () => {
    const { hotels } = useOutletContext()
    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate('/addHotel')
    }

     const isAdmin = JSON.parse(localStorage.getItem('user')).role === 'ADMIN'

     return (
        <div>
            <div className="text-center my-6">
                <h1 className="text-3xl font-bold text-white mb-4">Lista de Hoteles</h1>

                {isAdmin && (
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-64 rounded-md transition-colors"
                    >
                       Agregar Hotel 📝
                    </button>
                )}
            </div>

            <div className="flex flex-col bg-gray-900 items-center justify-center gap-6 py-6">
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
        </div>
    )
}
