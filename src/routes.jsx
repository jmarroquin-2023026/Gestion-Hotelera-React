import { element } from "prop-types";
import { Hotels } from "./components/hotel/Hotels";
import { AuthPage } from "./Pages/AuthPage";
import { DashboardPage } from "./Pages/DashboardPage";
import {FormPage} from '../src/Pages/FormPage'
import NotFound from "./Pages/NotFound";
import { HotelForm } from "./components/hotel/HotelForm";



export const routes=[
    {
        path:'/',
        element:<AuthPage/>
    },
    {
        path: '/auth', 
        element: <AuthPage />
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/addHotel',
        element: <FormPage/>
    },
    {
        path:'/hotel/update/:id',
        element: <FormPage/>
    },
    {
        path:'/dashboard',
        element:<DashboardPage/>,
        children:[
            {
                path:'hotels',
                element:<Hotels/>
            }
        ]
    }
]