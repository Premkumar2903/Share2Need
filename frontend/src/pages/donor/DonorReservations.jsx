import React, { useEffect, useState } from 'react'
import api from '../../services/api'


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
    <div>
      <div><h3>Donor reservations</h3></div>

      {error && <p>{error}</p>}

      {reservations.length === 0 ? (
        <p>
          No resrvation have been made for your food yet.
        </p>
      ):(
        <div>
          {reservations.map((reservation)=> (

          <div key={reservation.id}>
            <h2>
              {reservation.food_title}
            </h2>

            <p>
                  <strong>
                      Quantity:
                  </strong>{" "}
                  {reservation.quantity}{" "}
                  {reservation.unit}
              </p>

            <p>
              <strong>Pickup Address:</strong>{" "} 
              {reservation.pickup_address}
            </p>

            <p>
                <strong>
                    Available Until:
                </strong>{" "}
                {reservation.available_until}
            </p>
  

            <p> status: {reservation.status}</p>

            <p>receiver: {reservation.receiver}</p>
          </div>
        ))}
        </div>
      )}

      
    </div>
    
  )
}
