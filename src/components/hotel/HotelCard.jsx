import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDeteleHotel } from '../../shared/hooks/Hotel/useDeteleHotel'

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgyqyRI5AkJKmApQYPMUJ_VK4thp7WQTV-Lp0usec0dUFqfY9gca7elqzbOYvGkO4Rho&usqp=CAU'

export const HotelImage = ({ urls = [] }) => {
    if (urls.length === 0) {
        return (
            <div className="w-full h-full bg-slate-300 items-center justify-center">
                <img src={imageUrl} alt="Default Hotel" className="w-full h-full object-cover" />
            </div>
        )
    }

    return (
        <div className="flex gap-2 overflow-x-auto justify-center">
            {urls.map((url, index) => (
                <img
                    key={index}
                    src={`http://localhost:2636/uploads/img/hotels/${url}`}
                    alt={`Hotel ${index}`}
                    className="w-full h-full rounded-lg object-cover"
                />
            ))}
        </div>
    )
}

export const HotelCard = ({
    name,
    owner,
    id,
    address,
    category,
    amenities,
    reviews,
    reservations,
    photos,
    navigateToHotelHandler,
}) => {

    const navigate=useNavigate()
    const { deleteHotel, isLoading } = useDeteleHotel()

    const handleNavigateToHotel = () =>{
        navigateToHotelHandler(id)
    } 

    const handleEditButton = (id) => {
       navigate(`/hotel/update/${id}`)
    }

    const handleDetailsButton = (id) => {
       navigate(`/details/${id}`)
    }
    const handleDeleteHotel = async () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este hotel?')
    if (!confirmed) return;

    const success = await deleteHotel(id)

    if (success) {
        toast.success('Hotel eliminado con éxito')
    }
}

    const isAdmin = JSON.parse(localStorage.getItem('user')).role === 'ADMIN'

    return (
        <div onClick={handleNavigateToHotel} className="w-full max-w-5xl flex border-slate-800 p-4 rounded-lg shadow-lg bg-slate-800 hover:shadow-xl transition-shadow duration-300">
            <div className=" mt-8 w-96 h-full items-center justify-center">
                <HotelImage urls={[photos[0]]} />
            </div>

            <div className="w-2/3 flex flex-col gap-2 ml-3">
                <div className="border-2 border-blue-900 p-2 font-bold text-lg text-blue-200 bg-slate-800 rounded">
                    {name}
                </div>
                <div className="flex gap-2">
                    <div className="border p-1 w-1/2 bg-slate-800 font-semibold text-slate-300 rounded">{address}</div>
                    <div className="border p-1 w-1/2 bg-slate-800 font-semibold text-slate-300 rounded">{category}</div>
                </div>
                <div className="text-l border p-2 h-24 overflow-auto bg-slate-800 font-semibold text-slate-300 rounded">Comodidades: <br/>
                    {amenities}</div>
                <div className=" text-sm font-semibold text-slate-300 bg-slate-800 rounded">
                    {reviews.length > 0 ? `${reviews.length} reviews` : 'Aún no cuenta con review'}
                </div>

                <div className="flex gap-4 mt-2">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDetailsButton(id)
                        }}
                    >
                        Details 📖
                    </button>
                    {isAdmin && (
                        <>
                            <button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
            onClick={(e) => {
                e.stopPropagation()
                handleDeleteHotel()
            }}
            disabled={isLoading}
        >
            {isLoading ? 'Eliminando...' : 'Delete 🗑️'}
        </button>
                          <button
  onClick={(e) => {
    e.stopPropagation();
    handleEditButton(id);
  }}
  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
>
  Edit ✏️
</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

HotelCard.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    amenities: PropTypes.string.isRequired,
    reviews: PropTypes.array,
    reservations: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    navigateToHotelHandler: PropTypes.func.isRequired,
    role: PropTypes.string,
}

HotelCard.defaultProps = {
    role: 'USER',
}
