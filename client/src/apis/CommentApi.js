import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "get-all-comment": `${SERVER_CONTEXT}/api/comments/posts`,
    "new-comment": `${SERVER_CONTEXT}/api/comments/new/posts`,
    "new-response-comment": `${SERVER_CONTEXT}/api/comments`,
    "update-comment": `${SERVER_CONTEXT}/api/comments`,
    "delete-comment": `${SERVER_CONTEXT}/api/comments`,
};

export const getCommentsByPostId = (id) => authApi().get(`${endpoints['get-all-comment']}/${id}/`);
export const addNewComment = (id, body) => authApi().post(`${endpoints['new-comment']}/${id}/`, body);
export const addResponseComment = (id, body) => authApi().post(`${endpoints['new-response-comment']}/${id}/comments/`, body);
export const updateComment = (id, body) => authApi().put(`${endpoints['update-comment']}/${id}/`, body);
export const deleteComment = (id) => authApi().delete(`${endpoints['delete-comment']}/${id}/`);
