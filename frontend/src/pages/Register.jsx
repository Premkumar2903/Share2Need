import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Register() {

    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        username: '',
        email: "",
        password: "",
        phone: "",
        role: 'RECEIVER'
    })

    const [error,setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('')
        setSuccess('')
        setLoading(true)

        try{
            const response = await api.post(
                '/register/', formData
            )
            console.log(response.data)
            setSuccess('Registration Successful!')

            // Go to login after registration
            setTimeout(() => {
                navigate('/login')
            }, 1000);

        }catch(error){
            console.log(error)

            if(error.response?.data){
                setError(
                    JSON.stringify(error.response.data)
                )
            } else{
                setError('Something went wrong!')
            }
        } finally{
            setLoading(false)
        }
    }

  return (
    <div>
        <h1>Create account</h1>

        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="">Username:</label>
                <input type="text" 
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="">Email:</label>
                <input type="email" 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="">password:</label>
                <input type="password" 
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="">phone:</label>
                <input type='number' 
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div>

                <label htmlFor="">Role:</label>

                <select name="role" id=""
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="DONOR">Donor</option>
                    <option value="RECEIVER">Receiver</option>
                </select>
            </div>

            <button
                type='submit'
            >
                Submit
            </button>
        </form>


        {error && 
            <p>{error}</p>
        }

        {success && 
            <p>{success}</p>
        }

        <p>
            Already have an account?{''}
            <Link to='/login'>Login</Link>
        </p>
    </div>
  )
}
