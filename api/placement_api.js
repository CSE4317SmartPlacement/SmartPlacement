import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/placement";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}


export const retrieveMatchings = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/retrieve/all", formData, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const createPlacement = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/create", formData, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrievePlacementByStudentId = async (token, studentId) => {
    return await axiosInstance.post(baseURL + "/retrieve/studentid", { studentId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrievePlacementByPlacementId = async (token, placementId) => {
    return await axiosInstance.post(baseURL + "/retrieve/placementid", { placementId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrieveStudentsFromPlacementByFormId = async (token, formId) => {
    return await axiosInstance.post(baseURL + "/retrieve/students/formid", { formId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}