import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "register": `${SERVER_CONTEXT}/api/users/register/`,
    "login": `${SERVER_CONTEXT}/api/users/login/`,
    "current-user": `${SERVER_CONTEXT}/api/users/current_user/`,
    "update-info-user": `${SERVER_CONTEXT}/api/users/current_user/update_info/`,
    "update-avatar-user": `${SERVER_CONTEXT}/api/users/current_user/avatar/`,
    "update-bg-user": `${SERVER_CONTEXT}/api/users/current_user/cover_image/`,
    "get-user-by-username": `${SERVER_CONTEXT}/api/users`,
    "change-password": `${SERVER_CONTEXT}/api/users/change_password/`,
    "get-groups": `${SERVER_CONTEXT}/api/users/current_user/groups`,
    "get-letters": `${SERVER_CONTEXT}/api/users/current_user/letters`,
};

export const registerUser = (body) => ApiConfig.post(endpoints['register'], body);
export const getCurrentUser = () => authApi().get(endpoints['current-user']);
export const getUserByUsername = (username) => authApi().get(`${endpoints['get-user-by-username']}/${username}/`);
export const loginUser = (body) => ApiConfig.post(endpoints['login'], body);
export const updateInfoUser = (body) => authApi().patch(`${endpoints['update-info-user']}`, body);
export const updateAvatarUser = (body) => authApi().post(`${endpoints['update-avatar-user']}`, body);
export const updateCoverImageUser = (body) => authApi().post(`${endpoints['update-bg-user']}`, body);
export const changePassword = (body) => authApi().patch(`${endpoints['change-password']}`, body);
export const getGroups = () => authApi().get(`${endpoints['get-groups']}`);
export const getLetters = () => authApi().get(`${endpoints['get-letters']}`);