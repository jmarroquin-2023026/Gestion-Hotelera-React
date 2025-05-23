import React from 'react'
import { Outlet } from 'react-router-dom'

export const DashboardContent = ({ hotels = [], getHotels }) => {

    return (
        <div className='content-container'>
            <Outlet context={{ hotels, getHotels }} />
        </div>
    )
}
