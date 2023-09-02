import { SERVER_CONTEXT, authApi } from "../configs/ApiConfig";

const endpoints = {
    "get-major-by-department-id": `${SERVER_CONTEXT}/api/majors?departmentId=`,
};

export const getMajorsByDepartmentId = (departmentId) => authApi().get(`${endpoints['get-major-by-department-id']}${departmentId}`);