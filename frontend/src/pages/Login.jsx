import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/token/",
                formData
            );

            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

             const user = await login(
                accessToken,
                refreshToken
            );

            if (user.role === "DONOR") {

                navigate("/donor/dashboard");

            } else if (user.role === "RECEIVER") {

                navigate("/receiver/dashboard");
            }

        } catch (error) {

            console.error(error);

            if (error.response?.data) {
                setError("Invalid username or password.");
            } else {
                setError("Unable to connect to server.");
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Username:</label>

                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

            {error && (
                <p>{error}</p>
            )}

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>

        </div>
    );
}

export default Login;