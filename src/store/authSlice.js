import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, signIn, googleAuth } from "../services/authService";
import { handleAuthSuccess } from "../utils/handleAuthSuccess";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const initialState = loadState() || {
    user: null,
    token: null,
    status: "idle",
    error: null,
};

export const signUpUser = createAsyncThunk(
    "auth/signUp",
    async (userData) => {
        const response = await signUp(userData);
        return response.data;
    }
);

export const signInUser = createAsyncThunk(
    "auth/signIn",
    async (credentials) => {
        const response = await signIn(credentials);
        return response.data;
    }
);

export const googleAuthUser = createAsyncThunk(
    "auth/googleAuth",
    async (token) => {
        const response = await googleAuth(token);
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("authState");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.fulfilled, handleAuthSuccess)
            .addCase(signInUser.fulfilled, handleAuthSuccess)
            .addCase(googleAuthUser.fulfilled, handleAuthSuccess);
    },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
