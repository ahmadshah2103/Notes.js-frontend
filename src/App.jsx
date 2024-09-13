import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AuthPage from "./containers/AuthPage";
import ProfilePage from "./containers/ProfilePage";

export default function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/auth"
                        element={user ? <Navigate to="/profile" /> : <AuthPage />}
                    />
                    <Route
                        path="/profile"
                        element={user ? <ProfilePage /> : <Navigate to="/auth" />}
                    />
                    <Route path="/" element={<Navigate to="/auth" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
