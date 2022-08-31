import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/notifications";


const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}

export const retrieveNotifications = async (token, userId) => {
    return await axiosInstance.post(baseURL + "/retrieve/all", { userId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}