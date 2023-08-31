import { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "get-all-post": `${SERVER_CONTEXT}/api/posts?page=`,
    "get-post-by-user-id": `${SERVER_CONTEXT}/api/posts/users`,
    "get-post-by-current-user": `${SERVER_CONTEXT}/api/posts/current_user/`,
    "new": `${SERVER_CONTEXT}/api/posts/new/`,
    "update": `${SERVER_CONTEXT}/api/posts`,
    "delete": `${SERVER_CONTEXT}/api/posts`,
    "get-by-id": `${SERVER_CONTEXT}/api/posts`,
    "count-all-posts": `${SERVER_CONTEXT}/api/posts/counts/`,
    "lock-post": `${SERVER_CONTEXT}/api/posts`,
    "unlock-post": `${SERVER_CONTEXT}/api/posts`,
    "count-comment-quantity": `${SERVER_CONTEXT}/api/posts`,
};

export const getAllPosts = (page) => authApi().get(`${endpoints['get-all-post']}${page}`);
export const getPostsByUserId = (userId) => authApi().get(`${endpoints['get-post-by-user-id']}/${userId}/`);
export const getPostsByCurrentUser = () => authApi().get(endpoints['get-post-by-current-user']);
export const addNewPost = (body) => authApi().post(endpoints['new'], body);
export const updatePost = (id, body) => authApi().put(`${endpoints['update']}/${id}/`, body);
export const deletePost = (id) => authApi().delete(`${endpoints['delete']}/${id}/`);
export const getPostById = (id) => authApi().get(`${endpoints['get-by-id']}/${id}/`);
export const countAllPosts = () => authApi().get(endpoints['count-all-posts']);
export const lockPost = (id) => authApi().get(`${endpoints['lock-post']}/${id}/locked/`);
export const unlockPost = (id) => authApi().get(`${endpoints['unlock-post']}/${id}/unlocked/`);
export const getCommentQuantityByPostId = (id) => authApi().get(`${endpoints['count-comment-quantity']}/${id}/count_cmt/`);