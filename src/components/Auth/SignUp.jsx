import { signUpUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords do not match" }),
    dob: Joi.date().iso().required(),
    gender: Joi.string().valid("male", "female", "not_specified").required(),
});

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: "",
    });

    const dispatch = useDispatch();
    const { error, status } = useSelector(state => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const { error: validationError } = signupSchema.validate(formData, {
            abortEarly: false,
        });
        if (validationError) {
            setError(
                validationError.details
                    .map((detail) => detail.message)
                    .join(", ")
            );
            return;
        }

        const { confirmPassword, ...userData } = formData;

        try {
            await dispatch(signUpUser(userData)).unwrap();
            console.log("Sign up successful");
        } catch (err) {
            setError("Failed to sign up. Please try again.");
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="not_specified">Prefer not to say</option>
                    </select>
                </div>
                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
