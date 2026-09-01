import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <h1>Sahre2Need</h1>
        <p>Food Rescue Platform</p>

        <p>
            Rescue and donate surplur food. Feed someone in need.
        </p>

        <p>Share extra food with people nearby instead of letting it go waste.</p>

        <Link to = "/register">
             Get Started
        </Link>
            
        
    </div>
  )
}
