import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/dashboard.css'
import {LayersPlus , ReceiptText ,WalletCards} from 'lucide-react'

export default function DonorDashboard() {
  return (
    <main className='dashboard'>

        <section className='dashboard-header'>
          <div>
            <p className="dashboard-label">Donor Dashboard</p>

            <h1 className='text-4xl'>Welcome , Donor !</h1>
            <p className='dashboard-description'>
              Share surplus food that is available for others to collect.
            </p>
          </div>
        </section>

        {/* cards */}
        <section className='dashboard-actions'>

          <Link to={'/donor/foods/create'} className='dashboard-card'>
            <div className='card-icon' > <LayersPlus/> </div>

            <h2 className='text-3xl'>
              <LayersPlus className='inline card-icon' />
              Create Food Listing
            </h2>
            <p>
              Share surplus food that is available for others to collect.
            </p>
            <span className='card-link'>
                Add food
            </span>
          </Link>


          <Link to={'/donor/foods'} className='dashboard-card'>
              <h2 className='text-3xl'>
                <ReceiptText className='inline card-icon'></ReceiptText>
                My Food Listings
              </h2>
              <p>View and manage the food listings you have shared</p>

              <span className='card-link'>
                View listings
              </span>
          
          </Link>


          <Link to={'/donor/reservations'} className='dashboard-card'>

              
              <h2 className='text-3xl'>
                <WalletCards className='inline card-icon' />
                Reservation Details
              </h2>
              <p>Check who has reserved your food and manage reservations.</p>


              <span className='card-link'>
                View reservations
              </span>
          </Link>
        
      </section>
    </main>
  )
}


