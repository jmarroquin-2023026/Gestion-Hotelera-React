import React from 'react';
import PropTypes from 'prop-types';

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgyqyRI5AkJKmApQYPMUJ_VK4thp7WQTV-Lp0usec0dUFqfY9gca7elqzbOYvGkO4Rho&usqp=CAU';

const HotelImage = ({ urls = [] }) => {
    if (urls.length === 0) {
        return (
            <div className="channels-avatar-container">
                <img
                    src={imageUrl}
                    width='100%'
                    height='100%'
                    alt="Default Hotel"
                />
            </div>
        );
    }

    return (
        <div className="channels-avatar-container" style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {urls.map((url, index) => (
                <img
                    key={index}
                    src={`http://localhost:2636/uploads/img/hotels/${url}`}
                    width='150px'
                    height='100px'
                    alt={`Hotel ${index}`}
                    style={{ borderRadius: '8px' }}
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
    console.log('HotelCard role:', role);

    const handleNavigateToHotel = () => {
        navigateToHotelHandler(id);
    };

    const handleEditHotel = () => {
        console.log(`Editing hotel with ID: ${id}`);
    };

    const handleDeleteHotel = () => {
        console.log(`Deleting hotel with ID: ${id}`);
    };

    const isAdmin = JSON.parse(localStorage.getItem('user')).role == 'ADMIN' ? true : false

    console.log("Rol actual:", localStorage.getItem("user"))

    

    return (
        <div onClick={handleNavigateToHotel} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <HotelImage urls={photos} />
            <span>{name}</span>
            <span>{owner}</span>
            <span>{address}</span>
            <span>{category}</span>
            <span>{amenities}</span>
            <span>{reviews.length > 0 ? `${reviews.length} review${reviews.length > 1 ? 's' : ''}` : 'Aún no cuenta con review'}</span>
            <span>{reservations} reservation{reservations !== 1 ? 's' : ''}</span>

            {/* Debug: Display role for testing */}
            <div style={{ marginTop: '10px', color: 'gray' }}>
                Role: {role || 'Not provided'}
            </div>

            {/* Admin buttons */}
            {isAdmin ? (
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditHotel();
                        }}
                        style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteHotel();
                        }}
                        style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Delete
                    </button>
                        onClick
                </div>
            ) : (
                <div style={{ marginTop: '10px', color: 'red' }}>
                    No admin privileges
                </div>
            )}
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