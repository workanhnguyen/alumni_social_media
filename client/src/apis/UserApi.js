import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "register": `${SERVER_CONTEXT}/api/users/register/`,
    "current-user": `${SERVER_CONTEXT}/api/users/current-user/`,
};

export const registerUser = (body) => ApiConfig.post(endpoints['register'], body);
export const getCurrentUser = () => authApi().get(endpoints['current-user']);