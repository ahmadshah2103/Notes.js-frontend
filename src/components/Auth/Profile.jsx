import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(!user);
        if (!user) {
            setError('User not found');
        }
    }, [user]);

    const handleSignOut = async () => {
        try {
            setLoading(true);
            await signOut();
        } catch (error) {
            setError('Failed to sign out');
            console.error("Failed to sign out", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;

    const { name, email, dob, gender } = user;

    return (
        <div className="profile-container">
            <h2>Welcome to Your Profile</h2>
            <p>Hello, {name}! You've successfully signed in.</p>
            <div className="user-info">
                <p><strong>Email:</strong> {email}</p>
                {dob && <p><strong>Date of Birth:</strong> {new Date(dob).toLocaleDateString()}</p>}
                {gender && <p><strong>Gender:</strong> {gender}</p>}
            </div>
            <div className="action-buttons">
                <button onClick={() => console.log('Edit profile functionality to be implemented')}>
                    Edit Profile
                </button>
                <button onClick={handleSignOut} disabled={loading}>
                    {loading ? 'Signing Out...' : 'Sign Out'}
                </button>
            </div>
        </div>
    );
}