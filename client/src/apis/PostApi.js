import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "new": `${SERVER_CONTEXT}/api/posts/new/`,
    "update": `${SERVER_CONTEXT}/api/posts`,
    "delete": `${SERVER_CONTEXT}/api/posts`,
};

export const addNewPost = (body) => authApi().post(endpoints['new'], body);
export const updatePost = (id, body) => authApi().put(`${endpoints['update']}/${id}`, body);
export const deletePost = (id) => authApi().delete(`${endpoints['delete']}/${id}`);