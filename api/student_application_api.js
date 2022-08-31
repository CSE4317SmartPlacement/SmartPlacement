
import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/application/student";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}


export const retrieveStudentApplication = async (token) => {
    return await axiosInstance.post(baseURL + "/retrieve", {}, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrieveStudentApplicationFormByFormId = async (token, formId) => {
    return await axiosInstance.post(baseURL + "/retrieve/formid", { formId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const createStudentRequestApplication = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/create", formData, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const retrieveAllStudentApplications = async (token) => {
    return await axiosInstance.post(baseURL + "/retrieve/all", {}, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

export const updateStudentApplicationStatus = async (token, formId, status) => {
    return await axiosInstance.post(baseURL + "/update", { formId, status }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}


export const fetchStudentByStudentId = async (token, studentId) => {
    return await axiosInstance.post(baseURL + "/retrieve/studentid", { studentId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        })
}

