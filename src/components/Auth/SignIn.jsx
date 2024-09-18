import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signIn({ email, password });
            // Handle successful sign-in (e.g., redirect to dashboard)
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
            console.error('Sign in error:', error);
        }
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