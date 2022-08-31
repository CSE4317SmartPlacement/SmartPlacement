import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/application/agency/student";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}


export const createPlacementRequest = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/create", formData, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrieveAllPlacementRequests = async (token) => {
    return await axiosInstance.post(baseURL + "/retrieve/all", {}, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrievePlacementRequestByFormId = async (token, formId) => {
    return await axiosInstance.post(baseURL + "/retrieve/formid", { formId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}
