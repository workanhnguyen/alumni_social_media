import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "new": `${SERVER_CONTEXT}/api/comments/new/posts`,
    "update": `${SERVER_CONTEXT}/api/comments`,
    "delete": `${SERVER_CONTEXT}/api/comments`,
};

export const addNewComment = (id, body) => authApi().post(`${endpoints['new']}/${id}/`, body);
export const updateComment = (id, body) => authApi().put(`${endpoints['update']}/${id}/`, body);
export const deleteComment = (id) => authApi().delete(`${endpoints['delete']}/${id}/`);
