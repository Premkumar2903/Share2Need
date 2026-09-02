import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {

  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className='page'>
        <h1>Share2Need</h1>
        <p>Food Rescue Platform</p>

        <p>
            Rescue and donate surplur food. Feed someone in need.
        </p>

        <p>Share extra food with people nearby instead of letting it go waste.</p>

        {!isLoggedIn &&
          <Link to = "/register">
              Get Started
          </Link>
        }
        
            
        
    </div>
  )
}
