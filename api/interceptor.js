import Axios from 'axios'
import { Cookies } from 'react-cookie'
import { apiKey } from '../utils/secret'

export const axiosInstance = Axios.create({ timeout: 10000 })

axiosInstance.interceptors.request.use((config) => {
    config.headers.spsecretkey = apiKey
    return config
})

axiosInstance.interceptors.response.use((response) => { return response.data ?? null },
    (error) => {
        if (error.response && error.response.data) {
        } else {
            return Promise.reject({
                error: "Some unusual error occured. Please try again!"
            })
        }
        return Promise.reject(error.response.data)
    })