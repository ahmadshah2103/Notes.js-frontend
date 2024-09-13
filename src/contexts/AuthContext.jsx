import React, { createContext, useState, useEffect, useContext } from "react";
import { signUp, signIn, googleAuth } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const handleAuthResponse = (response) => {
        console.log(response.data);
        setUser(response.data.user);
        setToken(response.data.token);
        if (response.data.user && response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    };

    const handleSignUp = async (credentials) => {
        const response = await signUp(credentials);
        handleAuthResponse(response);
    };

    const handleSignIn = async (credentials) => {
        const response = await signIn(credentials);
        handleAuthResponse(response);
    };

    const handleGoogleAuth = async (token) => {
        const response = await googleAuth(token);
        handleAuthResponse(response);
    };

    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const value = {
        user,
        token,
        signUp: handleSignUp,
        signIn: handleSignIn,
        googleAuth: handleGoogleAuth,
        signOut: handleSignOut,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
