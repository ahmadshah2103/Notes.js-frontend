import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/authSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, status } = useSelector(state => state.auth);

    const handleSignOut = async () => {
        try {
            dispatch(signOut());
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    if (!user) navigate('/auth');
    if (status === 'loading') return <p>Loading profile...</p>;
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
                <button onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}