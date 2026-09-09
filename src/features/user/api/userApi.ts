import api from "../../../api/axios";
import type {
    PersonalInformationFormData,
    UserFormData,
} from "../schemas/userSchema";

// DISPLAY USERS
export const getUsers = (params = {}) => {
    return api.get("/users", { params });
};

// CREATE USERS
export const createUser = (data: UserFormData) => {
    return api.post("/users", data);
};

// UPDATE USERS
export const updateUser = (user: string, data: Partial<UserFormData>) => {
    return api.put(`/users/${user}`, data);
};

// DELETE USERS
export const deleteUser = (user: string) => {
    return api.delete(`/users/${user}`);
};

export const updateUserProfile = (
    profile: string,
    data: Partial<PersonalInformationFormData>,
) => {
    const formData = new FormData();

    if (data.first_name !== undefined) {
        formData.append("first_name", data.first_name);
    }

    if (data.middle_name !== undefined) {
        formData.append("middle_name", data.middle_name);
    }

    if (data.last_name !== undefined) {
        formData.append("last_name", data.last_name);
    }

    if (data.email !== undefined) {
        formData.append("email", data.email);
    }

    if (data.phone !== undefined) {
        formData.append("phone", data.phone);
    }

    if (data.profile_picture instanceof File) {
        formData.append("profile_picture", data.profile_picture);
    }

    return api.put(`/profile/${profile}`, formData);
};
