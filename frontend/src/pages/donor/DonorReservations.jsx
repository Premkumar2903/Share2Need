import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { formatDateTime } from '../../utils.js/datetime'
import '../../styles/reservation.css'


export default function DonorReservations() {

    const [reservations,setReservations] = useState([])
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchReservations = async () => {
      try{
        const fetchRes =  await api.get('foods/donor/reservation/')
        
        console.log('Donor reservations:', fetchRes.data)

        // loading the data in state
        setReservations(fetchRes.data)
      }catch(err) {
        //technical error in console (for developer)
        console.error('Unable to load reservation:',err)
        // showing user error
        setError('unble to load reservation')
      } finally{
        setLoading(false)
      }
    }
    
    useEffect(()=> {
      fetchReservations()
    },[])
    
    // if loading is true render
    if(loading){
      return <p>Loading reservations...</p>
    }

  return (
    <main className="reservations-page">

        <section className="reservations-header">

            <div>
                <p className="page-label">
                    DONOR RESERVATIONS
                </p>

                <h1>Food Reservations</h1>

                <p>
                    See who has reserved your food and track
                    reservation activity.
                </p>
            </div>

        </section>


        {error && (
            <div className="reservation-error">
                {error}
            </div>
        )}


        {reservations.length === 0 ? (

            <section className="empty-reservations">
                <h2>No reservations yet</h2>

                <p>
                    No reservations have been made for your food yet.
                    Once someone reserves your food, their reservation
                    will appear here.
                </p>

            </section>

        ) : (

            <section className="reservations-grid">

                {reservations.map((reservation) => (

                    <article
                        className="reservation-card"
                        key={reservation.id}
                    >

                        <div className="reservation-card-header">

                            <div>
                                <p className="reservation-label">
                                    FOOD RESERVED
                                </p>

                                <h2>
                                    {reservation.food_title}
                                </h2>
                            </div>

                            <span
                                className={`status-badge status-${reservation.status.toLowerCase()}`}
                            >
                                {reservation.status}
                            </span>

                        </div>


                        <div className="reservation-details">

                            <div className="reservation-detail">

                                <span className="detail-label">
                                    Quantity
                                </span>

                                <strong>
                                    {reservation.quantity}{" "}
                                    {reservation.unit}
                                </strong>

                            </div>


                            <div className="reservation-detail">

                                <span className="detail-label">
                                    Receiver
                                </span>

                                <strong>
                                    {reservation.receiver_name}
                                </strong>

                            </div>


                            <div className="reservation-detail">

                                <span className="detail-label">
                                    Available Until
                                </span>

                                <strong>
                                    {formatDateTime(reservation.available_until)}
                                </strong>

                            </div>


                            <div className="reservation-detail">

                                <span className="detail-label">
                                    Pickup Address
                                </span>

                                <strong>
                                    {reservation.pickup_address}
                                </strong>

                            </div>

                        </div>

                    </article>

                ))}

            </section>

        )}

    </main>
);
}
