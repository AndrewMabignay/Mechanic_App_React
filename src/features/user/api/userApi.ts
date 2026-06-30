import api from "../../../api/axios";
import type { UserFormData } from "../schemas/userSchema";

// DISPLAY USERS
export const getUsers = (params = {}) => {
    return api.get('/users', { params });
};

// CREATE USERS
export const createUser = (data: UserFormData) => {
    return api.post('/users', data);
};

// UPDATE USERS
export const updateUser = (
    user: string,
    data: Partial<UserFormData>,
) => {
    return api.put(`/users/${user}`, data);
};

// DELETE USERS
export const deleteUser = ( user: string ) => {
    return api.delete(`/users/${user}`);
};