import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { routes } from './routes'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/NavBar'

function App() {
  const elements=useRoutes(routes)

  return (
    <>
    <Navbar/>
     {elements}
     <Toaster position='bottom-right' reverseOrder={false}/>
    </>
  )
}

export default App
