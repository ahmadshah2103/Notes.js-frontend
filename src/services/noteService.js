import api from "./api";

export const getNotes = async (userId) => {
    const response = await api.get(`api/users/${userId}/notes`);
    return response.data;
};

export const createNote = async (userId, note) => {
    const response = await api.post(`api/users/${userId}/notes`, note);

    return response.data;
};

export const getNoteById = async (userId, noteId) => {
    const response = await api.get(`api/users/${userId}/notes/${noteId}`);

    return response.data;
};

export const updateNote = async (userId, noteId, updatedNote) => {
    const response = await api.put(`api/users/${userId}/notes/${noteId}`, updatedNote);

    return response.data;
};

export const deleteNote = async (userId, noteId) => {
    const response = await api.delete(`api/users/${userId}/notes/${noteId}`);

    return response.data;
};