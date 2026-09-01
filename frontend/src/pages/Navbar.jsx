
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
        <h2>
            <Link to='/'> Share2Need</Link>
        </h2>

        <div>
            <Link to='/'>Home</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'register'}>Register</Link>
        </div>
    </nav>
  )
}
