import axios from "axios"

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
            e
        }
    }
}

export const getHotelsRequest=async()=>{
    try{
        return await apiClient.get('/hotel/')
    }catch(e){
        return{

            error:true,
            e
        }
    }
}

export const addHotelRequest=async(hotelFromData) =>{
    try{
        return await apiClient.post('/hotel/add', hotelFromData)
    }catch(e){
        return{

            error:true,
            e
        }
    }
}

export const updateHotelRequest = async (id, hotelFormData) => {
  try {
    const response = await apiClient.put(`/hotel/${id}`, hotelFormData, {
    })
    return response
  } catch (e) {
    return { error: true, e }
  }
}

export const deleteHotelRequest = async (id, ) => {
  try {
    const response = await apiClient.delete(`/hotel/${id}`, {
    })
    return response
  } catch (e) {
    return { error: true, e }
  }
}

