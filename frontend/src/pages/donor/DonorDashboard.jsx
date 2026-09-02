import React from 'react'
import { Link } from 'react-router-dom'

export default function DonorDashboard() {
  return (
    <div>
        <p>welcome , Donor</p>
        <Link to={'/donor/foods/create'}>Create Food Listing</Link>

        <Link to={'/donor/foods'}>My Food Listings</Link>
    </div>
  )
}
