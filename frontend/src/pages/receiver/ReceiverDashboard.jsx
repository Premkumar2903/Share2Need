import React from 'react'
import { Link } from 'react-router-dom'

export default function ReceiverDashboard() {

  

  return (
    <div>
        <h1>Receiver Dashboard</h1>
        <p>Find surplus food available near you</p>

        <Link to="/receiver/reservations">
          My Reservations
      </Link>

        <Link to='/receiver/foods'>
            Browse Available Food
        </Link>


        
    </div>
  )
}
