import React from 'react'
import { useParams } from 'react-router-dom'
import { useHotelDetails } from '../../shared/hooks/Hotel/useHotelDatails'

export const HotelDetails = () => {
  const { id } = useParams()
  const { hotel, isLoading, error } = useHotelDetails(id)

  const renderStatusMessage = (message, color = 'text-gray-300') => (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <p className={`${color} text-lg`}>{message}</p>
    </div>
  )

  if (isLoading) return renderStatusMessage('Cargando...')
  if (error) return renderStatusMessage('Error al cargar el hotel', 'text-red-500')
  if (!hotel) return renderStatusMessage('No se encontró el hotel')

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">
      <div className="bg-slate-700 rounded-3xl shadow-xl w-full max-w-5xl p-6 md:p-10 text-white space-y-10">
 
        <h1 className="text-center text-4xl font-extrabold text-white">Detalles del Hotel</h1>

        <div>
          <h2 className="text-2xl font-bold mb-3">Galería</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {hotel.photos.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:2636/uploads/img/hotels/${photo}`}
                alt={`Hotel image ${index}`}
                className="w-60 h-40 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>
        <div className="border border-slate-500 rounded-xl p-6 bg-slate-800 max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-center">{hotel.name}</h2>
          <p className="text-slate-300 text-base">
            <span className="font-semibold">Dirección:</span> {hotel.address}
          </p>
          <p className="text-slate-300 text-base">
            <span className="font-semibold">Categoría:</span> {hotel.category}
          </p>
          <p className="text-slate-300 text-base">
            <span className="font-semibold">Reservas:</span> {hotel.reservations?.length || 0}{' '}
            {hotel.reservations?.length === 1 ? 'reserva' : 'reservas'}
          </p>
          <p className="text-slate-300 text-base">
            <span className="font-semibold">Comodidades:</span> {hotel.amenities}
          </p>
          <p className="text-slate-300 text-base">
            <span className="font-semibold">Reviews:</span> {hotel.reviews.length > 0 ? `${hotel.reviews.length} reviews` : 'Aún no cuenta con reviews'}
          </p>
        </div>
      </div>
    </div>
  )
}
