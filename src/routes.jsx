import { AuthPage } from "./Pages/AuthPage";
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
    }
]