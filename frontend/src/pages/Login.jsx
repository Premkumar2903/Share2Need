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
        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            p-4
            sm:p-6
        ">

            <div className="
                w-full
                max-w-5xl
                bg-white
                rounded-2xl
                shadow-xl
                overflow-hidden
                grid
                grid-cols-1
                md:grid-cols-2
                min-h-[650px]
            ">

                {/* IMAGE */}

                <div className="
                    relative
                    min-h-[300px]
                    md:min-h-[650px]
                ">

                    <img
                        src="/image.png"
                        alt="People sharing food"
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                        "
                    />

                    <div className="
                        absolute
                        inset-0
                        bg-black/40
                    " />

                </div>


                {/* LOGIN FORM */}

                <div className="
                    flex
                    flex-col
                    justify-center
                    px-6
                    py-10
                    sm:px-10
                    sm:py-12
                    md:px-12
                ">

                    <div className="mb-8">

                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-800
                        ">
                            Welcome back
                        </h1>

                        <p className="
                            mt-3
                            text-gray-500
                            leading-relaxed
                        ">
                            Login to your Share2Need account
                            and continue making a difference.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* USERNAME */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                font-medium
                                text-gray-700
                            ">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                className="
                                    w-full
                                    px-4
                                    py-3.5
                                    border
                                    border-gray-300
                                    rounded-lg
                                    outline-none
                                    text-gray-800
                                    placeholder-gray-400
                                    focus:border-green-600
                                    focus:ring-2
                                    focus:ring-green-100
                                "
                            />

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                font-medium
                                text-gray-700
                            ">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="
                                    w-full
                                    px-4
                                    py-3.5
                                    border
                                    border-gray-300
                                    rounded-lg
                                    outline-none
                                    text-gray-800
                                    placeholder-gray-400
                                    focus:border-green-600
                                    focus:ring-2
                                    focus:ring-green-100
                                "
                            />

                        </div>


                        {/* ERROR */}

                        {error && (
                            <p className="
                                p-3
                                text-sm
                                text-red-600
                                bg-red-50
                                border
                                border-red-200
                                rounded-lg
                            ">
                                {error}
                            </p>
                        )}


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                py-3.5
                                bg-green-700
                                text-white
                                font-semibold
                                rounded-lg
                                hover:bg-green-800
                                transition
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"
                            }
                        </button>

                    </form>


                    {/* REGISTER LINK */}

                    <p className="
                        mt-7
                        text-center
                        text-sm
                        text-gray-500
                    ">
                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="
                                text-green-700
                                font-semibold
                                hover:underline
                            "
                        >
                            Create account
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;