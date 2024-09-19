import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./containers/AuthPage";
import ProfilePage from "./containers/ProfilePage";
import DashboardPage from "./containers/DashboardPage";
import CreateOrUpdateNotePage from "./containers/CreateOrUpdateNotePage";
import Navbar from "./components/Common/Navbar";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
    const authState = useSelector((state) => state.auth);
    const user = authState.user;

    useEffect(() => {
        console.log(authState);
    }, [authState]);

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route
                        path="/auth"
                        element={
                            user ? <Navigate to="/dashboard" /> : <AuthPage />
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            user ? <DashboardPage /> : <Navigate to="/auth" />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            user ? <ProfilePage /> : <Navigate to="/auth" />
                        }
                    />
                    <Route
                        path="/create-note"
                        element={
                            user ? (
                                <CreateOrUpdateNotePage />
                            ) : (
                                <Navigate to="/auth" />
                            )
                        }
                    />
                    <Route
                        path="/update-note/:noteId"
                        element={
                            user ? (
                                <CreateOrUpdateNotePage />
                            ) : (
                                <Navigate to="/auth" />
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            user ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <Navigate to="/auth" />
                            )
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
