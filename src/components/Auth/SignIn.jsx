import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../store/authSlice';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {error} = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
        setEmail('');
        setPassword('');
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    Sign In
                </button>
            </form>
        </div>
    );
}