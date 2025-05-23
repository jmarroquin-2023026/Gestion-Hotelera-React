import React from 'react';
import PropTypes from 'prop-types';

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgyqyRI5AkJKmApQYPMUJ_VK4thp7WQTV-Lp0usec0dUFqfY9gca7elqzbOYvGkO4Rho&usqp=CAU';

const HotelImage = ({ urls = [] }) => {
    if (urls.length === 0) {
        return (
            <div className="w-full h-full bg-orange-500">
                <img src={imageUrl} alt="Default Hotel" className="w-full h-full object-cover" />
            </div>
        );
    }

    return (
        <div className="flex gap-2 overflow-x-auto">
            {urls.map((url, index) => (
                <img
                    key={index}
                    src={`http://localhost:2636/uploads/img/hotels/${url}`}
                    alt={`Hotel ${index}`}
                    className="w-[150px] h-[100px] rounded-lg"
                />
            ))}
        </div>
    );
};

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
    role,
}) => {
    const handleNavigateToHotel = () => navigateToHotelHandler(id);
    const handleEditHotel = () => console.log(`Editing hotel with ID: ${id}`);
    const handleDeleteHotel = () => console.log(`Deleting hotel with ID: ${id}`);

    const isAdmin = JSON.parse(localStorage.getItem('user')).role === 'ADMIN';

    return (
        <div className="flex gap-4 border p-4 rounded-lg shadow-md bg-white">
            <div className="w-1/3 flex items-center justify-center">
                <HotelImage urls={[photos[0]]} />
            </div>

            <div className="w-2/3 flex flex-col gap-2">
                <div className="border-2 border-orange-500 p-2 font-bold text-lg">{name}</div>
                <div className="flex gap-2">
                    <div className="border p-1 w-1/2">{address}</div>
                    <div className="border p-1 w-1/2">{category}</div>
                </div>
                <div className="border p-2 h-24 overflow-auto text-sm">{amenities}</div>
                <div className="border p-1 text-sm">{reviews.length > 0 ? `${reviews.length} reviews` : 'Aún no cuenta con review'}</div>

                <div className="flex gap-4 mt-2">
                    <button
                        className="bg-green-600 text-white py-1 px-4 rounded"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNavigateToHotel();
                        }}
                    >
                        Details
                    </button>
                    {isAdmin && (
                        <>
                            <button
                                className="bg-red-700 text-white py-1 px-4 rounded"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteHotel();
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-blue-500 text-white py-1 px-4 rounded"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditHotel();
                                }}
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

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
};

HotelCard.defaultProps = {
    role: 'USER',
};
