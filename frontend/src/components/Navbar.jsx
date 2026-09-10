import { useAuth } from '../context/AuthContext';
import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react';
export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav>
        <h2>
            <Link to='/'> Share2Need</Link>
        </h2>

        <div className='flex nav-container'>
            <Link to='/'>Home</Link>

            <Link to='/about'>About</Link>
        
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
              <button onClick={logout} className='flex items-center justify-center gap-1.5'>
                <LogOut size={18}/> 
                <span >
                  Logout
                </span>
              </button>
            )}
            
        </div>
    </nav>
  )
}
