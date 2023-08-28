import { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "new": `${SERVER_CONTEXT}/api/posts/new/`,
    "update": `${SERVER_CONTEXT}/api/posts`,
    "delete": `${SERVER_CONTEXT}/api/posts`,
    "get-by-id": `${SERVER_CONTEXT}/api/posts`,
    "count-all-posts": `${SERVER_CONTEXT}/api/posts/counts/`,
    "lock-post": `${SERVER_CONTEXT}/api/posts`,
    "unlock-post": `${SERVER_CONTEXT}/api/posts`,
};

export const addNewPost = (body) => authApi().post(endpoints['new'], body);
export const updatePost = (id, body) => authApi().put(`${endpoints['update']}/${id}/`, body);
export const deletePost = (id) => authApi().delete(`${endpoints['delete']}/${id}/`);
export const getPostById = (id) => authApi().get(`${endpoints['get-by-id']}/${id}/`);
export const countAllPosts = () => authApi().get(endpoints['count-all-posts']);
export const lockPost = (id) => authApi().get(`${endpoints['lock-post']}/${id}/locked/`);
export const unlockPost = (id) => authApi().get(`${endpoints['unlock-post']}/${id}/unlocked/`);