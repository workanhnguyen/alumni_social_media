import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "register": `${SERVER_CONTEXT}/api/users/register/`,
    "login": `${SERVER_CONTEXT}/api/users/login/`,
    "current-user": `${SERVER_CONTEXT}/api/users/current_user/`,
    "update-user": `${SERVER_CONTEXT}/api/users`,
    "get-user-by-username": `${SERVER_CONTEXT}/api/users`,
};

export const registerUser = (body) => ApiConfig.post(endpoints['register'], body);
export const getCurrentUser = () => authApi().get(endpoints['current-user']);
export const getUserByUsername = (username) => authApi().get(`${endpoints['get-user-by-username']}/${username}/`);
export const loginUser = (body) => ApiConfig.post(endpoints['login'], body);
export const updateUser = (id, body) => authApi().put(`${endpoints['update-user']}/${id}`, body);