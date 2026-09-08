import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import '../../styles/reservation.css'
import { formatDateTime } from "../../utils.js/datetime";


export default function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [cancellingId, setCancellingId] = useState(null);

    const [completingId, setCompletingId] = useState(null);

    const fetchReservations = async () => {
        try {
            const response = await api.get(
                "/foods/reservation/my/"
            );

            console.log("My reservations:", response.data);

            setReservations(response.data);

        } catch (error) {
            console.error("Failed to load reservations:", error);

            setError("Unable to load your reservations.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    if (loading) {
        return <p>Loading reservations...</p>;
    }


    const handleCancel = async (reservationId) => {
        try {
            setCancellingId(reservationId);
            setError("");

            const response = await api.post(
                `/foods/reservation/${reservationId}/cancel/`
            );

            console.log("Cancellation successful:", response.data);

            // Reload reservations
            fetchReservations();

        } catch (error) {
            console.error("Cancellation failed:", error);

            setError(
                error.response?.data
                    ? JSON.stringify(error.response.data)
                    : "Unable to cancel reservation."
            );

        } finally {
            setCancellingId(null);
        }
    };


    const handleComplete = async (reservationId) => {
        try{
            setCompletingId(reservationId)
            setError('')

            const response = await api.post(
                `/foods/reservation/${reservationId}/complete/`
            )

            console.log(
                'Completion successful:',
                response.data
            )
            fetchReservations();

        } catch(error) {
            console.error(
                'Completion failed:',
                error
            )

            setError(
                error.response?.data
                    ?JSON.stringify(error.response.data)
                    : 'unable to complete reservation.'
            )
        } finally {
            setCompletingId(null)
        }
    }

    return (
        <main className="reservations-page">

            <section className="reservation-page">
                <h1 className="text-3xl mb-1.5">My Reservations</h1>

                <p>
                    Track the food you've reserved and manage your reservations
                </p>
            </section>
            

            {error && (
                <div className="reservation-error">
                    {error}
                </div>
            )}

            {reservations.length === 0 ? (
                // laod when no reservation 
                <section>
                   <h2>No reservations yet</h2>
                   <p>You haven't reserved any food yet.</p> 

                   <Link to={'/receiver/foods'}
                        className="primary-button"
                   >
                        Browse Food
                    </Link>
                </section>
                
            ) : (
                <section className="reservations-grid">

                    {reservations.map((reservation) => (

                        <article 
                            className="reservation-card"
                            key={reservation.id}
                        >
                            <div className="reservation-card-header">
                                <h2>{reservation.food_title}</h2>

                                {/* dynamic class name */}
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
                                        Pickup Address
                                    </span>

                                    <strong>
                                        {reservation.pickup_address}
                                    </strong>
                                </div>


                                <div className="reservation-detail">
                                    <span className="detail-label">
                                        Avaliable Until
                                    </span>

                                    <strong>
                                        {formatDateTime(reservation.available_until)}
                                    </strong>
                                </div>
                            </div>


                            <div  className="reservation-actions">
                                <Link
                                    to={`/receiver/foods/${reservation.food}`}
                                    className="view-food-btn"
                                >
                                    View Food
                                </Link>

                                {reservation.status === "RESERVED" && (
                                    <>
                                        <button
                                            onClick={() => handleCancel(reservation.id)}
                                            disabled={cancellingId === reservation.id}
                                        >
                                            {cancellingId === reservation.id
                                                ? "Cancelling..."
                                                : "Cancel Reservation"}
                                        </button>

                                        <button
                                            onClick={()=> handleComplete(reservation.id)}
                                            disabled={completingId === reservation.id}
                                        >
                                            {completingId === reservation.id ? 'completing' : 'Mark Completed'}
                                        </button>
                                    </>
                                    
                                )}
                            </div>




                                {/* <p>
                                    <strong>
                                        Quantity:
                                    </strong>{" "}
                                    {reservation.quantity}{" "}
                                    {reservation.unit}
                                </p>

                                <p>
                                    <strong>
                                        Pickup Address:
                                    </strong>{" "}
                                    {reservation.pickup_address}
                                </p>

                                <p>
                                    <strong>
                                        Available Until:
                                    </strong>{" "}
                                    {reservation.available_until}
                                </p>

                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {reservation.status}
                                </p>

                                <Link
                                    to={`/receiver/foods/${reservation.food}`}
                                >
                                    View Food
                                </Link>
                            
                            

                            {reservation.status === "RESERVED" && (
                                <>
                                    <button
                                        onClick={() => handleCancel(reservation.id)}
                                        disabled={cancellingId === reservation.id}
                                    >
                                        {cancellingId === reservation.id
                                            ? "Cancelling..."
                                            : "Cancel Reservation"}
                                    </button>

                                    <button
                                        onClick={()=> handleComplete(reservation.id)}
                                        disabled={completingId === reservation.id}
                                    >
                                        {completingId === reservation.id ? 'completing' : 'Mark Completed'}
                                    </button>
                                </>
                                
                             )}

                            <hr /> */}
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}