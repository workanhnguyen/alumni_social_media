import ApiConfig, { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "get-comment-by-post-id": `${SERVER_CONTEXT}/api/comments/posts`,
    "new-comment": `${SERVER_CONTEXT}/api/comments/new/posts`,
    "new-response-comment": `${SERVER_CONTEXT}/api/comments`,
    "update-comment": `${SERVER_CONTEXT}/api/comments`,
    "delete-comment": `${SERVER_CONTEXT}/api/comments`,
};

export const getCommentsByPostId = (id, pageIndex) => authApi().get(`${endpoints['get-comment-by-post-id']}/${id}/`, pageIndex);
export const addNewComment = (postId, body) => authApi().post(`${endpoints['new-comment']}/${postId}/`, body);
export const addResponseComment = (parentCommentId, body) => authApi().post(`${endpoints['new-response-comment']}/${parentCommentId}/comments/`, body);
export const updateComment = (id, body) => authApi().put(`${endpoints['update-comment']}/${id}/`, body);
export const deleteComment = (id) => authApi().delete(`${endpoints['delete-comment']}/${id}/`);
