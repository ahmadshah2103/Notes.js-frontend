import api from "./api";

export const signUp = async (userData) => {
    try {
        const response = await api.post("api/users", userData);
        return response;
    } catch (error) {
        console.error("Sign up error:", error);
        throw error;
    }
};
export const signIn = async (credentials) => {
    try {
        const response = await api.post("api/users/signin", credentials);
        return response;
    } catch (error) {
        console.error("Sign in error:", error);
        throw error;
    }
};
export const googleAuth = async (token) => {
    try {
        const response = await api.post("api/users/google_auth", { token });
        return response;
    } catch (error) {
        console.error("Google auth error:", error);
        throw error;
    }
};
