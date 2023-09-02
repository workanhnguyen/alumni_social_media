import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "get-all-departments": `${SERVER_CONTEXT}/api/departments/`,
};

export const getAllDepartments = () => authApi().get(endpoints['get-all-departments']);