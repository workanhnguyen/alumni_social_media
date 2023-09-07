import { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "get-all-reaction-of-post": `${SERVER_CONTEXT}/api/reactions/posts`,
    "get-reaction-on-post": `${SERVER_CONTEXT}/api/reactions/reaction-on-post`,
    "add-reaction-to-post": `${SERVER_CONTEXT}/api/reactions/posts`,
    "delete-reaction-from-post": `${SERVER_CONTEXT}/api/reactions`,
};

export const getReactionsByPostId = (postId) => authApi().get(`${endpoints['get-all-reaction-of-post']}/${postId}/`);
export const getReactionOnPost = (postId) => authApi().get(`${endpoints['get-reaction-on-post']}/${postId}/`);
export const addReactionToPost = (postId, body) => authApi().post(`${endpoints['add-reaction-to-post']}/${postId}/`, body);
export const deleteReactionFromPost = (id) => authApi().delete(`${endpoints['delete-reaction-from-post']}/${id}/`);