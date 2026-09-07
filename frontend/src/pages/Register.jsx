import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'RECEIVER'
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const response = await api.post(
                '/register/',
                formData
            )

            console.log(response.data)
            setSuccess('Registration Successful!')

            setTimeout(() => {
                navigate('/login')
            }, 1000)

        } catch (error) {
            console.log(error)

            if (error.response?.data) {
                setError(JSON.stringify(error.response.data))
            } else {
                setError('Something went wrong!')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">

            <div className="
                w-full max-w-5xl
                bg-white
                rounded-2xl
                shadow-xl
                overflow-hidden
                grid grid-cols-1 md:grid-cols-2
                min-h-[700px]
            ">

                {/* IMAGE */}
                <div className="relative min-h-[300px] md:min-h-[700px]">
                    <img
                        src="/image.png"
                        alt="People sharing food"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="
                        absolute inset-0
                        bg-black/40
                        flex items-end
                        p-8 md:p-10
                    ">
                        <div className="text-white">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Share More.
                            </h2>

                            <h2 className="text-3xl md:text-4xl font-bold">
                                Waste Less.
                            </h2>

                            <p className="mt-4 text-sm md:text-base max-w-sm leading-relaxed">
                                Connect with your community and make
                                surplus food count.
                            </p>
                        </div>
                    </div>
                </div>


                {/* FORM */}
                <div className="
                    flex flex-col justify-center
                    px-6 py-10
                    sm:px-10 sm:py-12
                    md:px-12
                ">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create account
                        </h1>

                        <p className="mt-3 text-gray-500 leading-relaxed">
                            Join Share2Need and make a difference
                            in your community.
                        </p>
                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* USERNAME */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
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
                                    w-full px-4 py-3.5
                                    border border-gray-300
                                    rounded-lg
                                    outline-none
                                    focus:border-green-600
                                    focus:ring-2 focus:ring-green-100
                                "
                            />
                        </div>


                        {/* EMAIL */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="
                                    w-full px-4 py-3.5
                                    border border-gray-300
                                    rounded-lg
                                    outline-none
                                    focus:border-green-600
                                    focus:ring-2 focus:ring-green-100
                                "
                            />
                        </div>


                        {/* PASSWORD + PHONE */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                    className="
                                        w-full px-4 py-3.5
                                        border border-gray-300
                                        rounded-lg
                                        outline-none
                                        focus:border-green-600
                                        focus:ring-2 focus:ring-green-100
                                    "
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Phone
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone number"
                                    className="
                                        w-full px-4 py-3.5
                                        border border-gray-300
                                        rounded-lg
                                        outline-none
                                        focus:border-green-600
                                        focus:ring-2 focus:ring-green-100
                                    "
                                />
                            </div>

                        </div>


                        {/* ROLE */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Role
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="
                                    w-full px-4 py-3.5
                                    border border-gray-300
                                    rounded-lg
                                    bg-white
                                    outline-none
                                    focus:border-green-600
                                    focus:ring-2 focus:ring-green-100
                                "
                            >
                                <option value="DONOR">Donor</option>
                                <option value="RECEIVER">Receiver</option>
                            </select>
                        </div>


                        {/* MESSAGES */}
                        {error && (
                            <p className="
                                p-3
                                text-sm text-red-600
                                bg-red-50
                                border border-red-200
                                rounded-lg
                            ">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="
                                p-3
                                text-sm text-green-700
                                bg-green-50
                                border border-green-200
                                rounded-lg
                            ">
                                {success}
                            </p>
                        )}


                        {/* BUTTON */}
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
                                ? 'Creating account...'
                                : 'Create Account'
                            }
                        </button>

                    </form>


                    {/* LOGIN */}
                    <p className="mt-7 text-center text-sm text-gray-500">
                        Already have an account?{' '}

                        <Link
                            to="/login"
                            className="text-green-700 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div>

    </div>
    )
}