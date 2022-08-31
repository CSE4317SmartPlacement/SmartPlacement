import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/auth";

export const execLogin = async (email, password) => {
    return await axiosInstance.post(baseURL + "/login", { email, password }).then((response) => {
        return response.data;
    }).catch((error) => {
        throw error;
    })
}

export const execRegister = async (id, email, password, accessLevel) => {
    return await axiosInstance.post(baseURL + "/register", { id, email, password, accessLevel })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}