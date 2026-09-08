import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/dashboard.css'
import {LayersPlus , PackageSearch, ReceiptText ,WalletCards} from 'lucide-react'

export default function ReceiverDashboard() {

  

  return (
    <main className='dashboard'>

      <section className='dashboard-header'>
        <div>
          <p className='dashboard-label'>Receiver Dashboard</p>
          <h1 className='text-4xl'>Welcome Receiver</h1>

          <p className='dashboard-description'>Find surplus food available near you</p>
        </div>
        
      </section>

      <section className='dashboard-actions'>
        <Link to='/receiver/foods' className='dashboard-card'>
            <h2>
              <PackageSearch className='inline card-icon'/>
              Browse Available Food
            </h2>
            <p>Discover surplus food shared by donors and find food available</p>
            <span className='card-link'>
                Find Food
            </span>
        </Link>


        <Link to="/receiver/reservations" className='dashboard-card'>
          <h2>
            <ReceiptText className='inline card-icon'/>
            My Reservations
          </h2>
          <p>View your reserved food, track reservation status, and manage your requests</p>
          <span className='card-link'>
                View Reservations
          </span>
        </Link>
        
      </section>
 
    </main>
  )
}
