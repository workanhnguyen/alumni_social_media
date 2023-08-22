import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "http://localhost:8080/server";

export const endpoints = {
  "register": `${SERVER_CONTEXT}/api/users/register/`,
  "current-user": `${SERVER_CONTEXT}/api/users/current-user/`,
};

export const authApi = () => {
  return axios.create({
    baseURL: SERVER_CONTEXT,
    headers: {
      Authorization: cookie.load("token"),
    },
  });
};

export default axios.create({
  baseURL: SERVER_CONTEXT,
});
