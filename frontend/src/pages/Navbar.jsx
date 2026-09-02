import { useAuth } from '../context/AuthContext';
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav>
        <h2>
            <Link to='/'> Share2Need</Link>
        </h2>

        <div>
            <Link to='/'>Home</Link>
        
        {!isLoggedIn && 
          <>
            <Link to={'/login'}>Login</Link>
            <Link to={'register'}>Register</Link>
          </>
        }

        {isLoggedIn && user?.role === 'DONOR' &&(
          <Link to={'donor/dashboard'}>
             Dashboard
          </Link>
        )}

        {isLoggedIn && user ?.role === 'RECEIVER' && (
          <Link to={'receiver/dashboard'}>
             Dashboard
          </Link>
        )}

        {isLoggedIn && (
          <button onClick={logout}>
            Logout
          </button>
        )}
            
        </div>
    </nav>
  )
}
