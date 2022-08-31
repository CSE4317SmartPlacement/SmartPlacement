
import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/application/agency";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}


export const retrieveAgencyDetail = async (token) => {
    return await axiosInstance.post(baseURL + "/retrieve", {}, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}


export const retrieveAgencyApplicationFormByFormId = async (token, formId) => {
    return await axiosInstance.post(baseURL + "/retrieve/formid", { formId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrieveAgencyApplicationFormByAgencyId = async (token, agencyId) => {
    return await axiosInstance.post(baseURL + "/retrieve/agencyid", { agencyId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const createAgencyRequestApplication = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/create", formData, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrieveAllAgencyRequestApplications = async (token) => {
    return await axiosInstance.post(baseURL + "/retrieve/all", {}, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const updateAgencyApplicationStatus = async (token, id, status) => {
    return await axiosInstance.patch(baseURL + "/" + id, { "status": status }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}


