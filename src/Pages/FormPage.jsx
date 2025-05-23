import React, { useState } from 'react'

import "../index.css"
import { HotelForm } from '../components/hotel/HotelForm'

export const FormPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <HotelForm/>
    </div>
  )
}
