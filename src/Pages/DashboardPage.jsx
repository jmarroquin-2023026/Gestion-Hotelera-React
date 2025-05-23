import React, { useEffect } from 'react'
import { useHotels } from '../shared/hooks/Hotel/useHotels'
import { DashboardContent } from '../components/DashboardContent'

export const DashboardPage = () => {
    const { getHotels, allHotels } = useHotels()

    useEffect(() => {
        getHotels()
    }, [])

    useEffect(() => {
        console.log("DashboardPage - allHotels actualizado:", allHotels)
    }, [allHotels])

    return (
        <div >
            <DashboardContent hotels={allHotels} getHotels={getHotels} />
        </div>
    )
}
