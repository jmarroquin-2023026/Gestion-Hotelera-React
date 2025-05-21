import axios from "axios";

const apiClient=axios.create(
    {
        baseURL:'http://localhost:2636',
        timeout:2000
    }
)

apiClient.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token')
        if(token){
            config.headers.Authorization=token
        }
        return config
    }
)

export const registerRequest = async (userFormData) => {
    try {
        return await apiClient.post('/v1/register', userFormData)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const loginRequest=async(user)=>{
    try{
        return await apiClient.post('/v1/login',user)
    }catch(e){
        return {
            error: true,
            message: e?.response?.data?.message || 'Error inesperado',
            status: e?.response?.status,
            e
        }
    }
}