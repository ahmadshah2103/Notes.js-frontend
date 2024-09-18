import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AuthPage from "./containers/AuthPage";
import ProfilePage from "./containers/ProfilePage";
import DashboardPage from "./containers/DashboardPage";
import CreateOrUpdateNotePage from "./containers/CreateOrUpdateNotePage";
import Navbar from "./components/Common/Navbar";
import { getNotes } from "./services/noteService";

export default function App() {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (user) {
            getNotes(user.id)
                .then((fetchedNotes) => setNotes(fetchedNotes))
                .catch((error) =>
                    console.error("Error fetching notes:", error)
                );
        }
    }, [user]);

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
                            user ? (
                                <DashboardPage
                                    notes={notes}
                                    setNotes={setNotes}
                                />
                            ) : (
                                <Navigate to="/auth" />
                            )
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
                                <CreateOrUpdateNotePage
                                    notes={notes}
                                    setNotes={setNotes}
                                />
                            ) : (
                                <Navigate to="/auth" />
                            )
                        }
                    />
                    <Route
                        path="/update-note/:noteId"
                        element={
                            user ? (
                                <CreateOrUpdateNotePage
                                    notes={notes}
                                    setNotes={setNotes}
                                />
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
