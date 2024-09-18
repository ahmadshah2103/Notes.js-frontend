import { useState } from "react";
import { SignIn, SignUp } from "../components/Auth";

export default function AuthContainer() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <>
            <h1>My App</h1>
            {isSignUp ? (
                <>
                    <SignUp />
                    <p>
                        Already have an account?{" "}
                        <button onClick={toggleAuthMode}>Sign In</button>
                    </p>
                </>
            ) : (
                <>
                    <SignIn />
                    <p>
                        Don't have an account?{" "}
                        <button onClick={toggleAuthMode}>Sign Up</button>
                    </p>
                </>
            )}
        </>
    );
}
