import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "get-all-comment": `${SERVER_CONTEXT}/api/comments/posts`,
    "new": `${SERVER_CONTEXT}/api/comments/new/posts`,
    "update": `${SERVER_CONTEXT}/api/comments`,
    "delete": `${SERVER_CONTEXT}/api/comments`,
};

export const getAllComments = (id) => authApi().get(`${endpoints['get-all-comment']}/${id}/`);
export const addNewComment = (id, body) => authApi().post(`${endpoints['new']}/${id}/`, body);
export const updateComment = (id, body) => authApi().put(`${endpoints['update']}/${id}/`, body);
export const deleteComment = (id) => authApi().delete(`${endpoints['delete']}/${id}/`);
