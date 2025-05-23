import React from 'react'
import PropTypes from 'prop-types'

const imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgyqyRI5AkJKmApQYPMUJ_VK4thp7WQTV-Lp0usec0dUFqfY9gca7elqzbOYvGkO4Rho&usqp=CAU'

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
    navigateToHotelHandler
}) => {

    const handleNavigateToHotel=()=>{
        navigateToHotelHandler(id)
    }

  return (
    <div onClick={handleNavigateToHotel}>
        <HotelImage urls={photos}/>
            <span>{name}</span>
            <span>{owner}</span>
            <span>{address}</span>
            <span>{category}</span>
            <span>{amenities}</span>
            <span>{reviews.length >0 ? `${reviews.length} review` : 'Aún no cuenta con review'}</span>
            <span>{reservations}</span>
    </div>
  )
}

HotelCard.propTypes = {
    name:PropTypes.string.isRequired,   
    id:PropTypes.string.isRequired,
    address:PropTypes.string.isRequired,
    category:PropTypes.string.isRequired,
    amenities:PropTypes.string.isRequired,
    reviews:PropTypes.array,
    reservations:PropTypes.number.isRequired,
    photos:PropTypes.string.isRequired,
    navigateToHotelHandler:PropTypes.func.isRequired

}

