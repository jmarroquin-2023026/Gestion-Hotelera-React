import { Hotels } from "./components/hotel/Hotels";
import { AuthPage } from "./Pages/AuthPage";
import { DashboardPage } from "./Pages/DashboardPage";
import NotFound from "./Pages/NotFound";


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