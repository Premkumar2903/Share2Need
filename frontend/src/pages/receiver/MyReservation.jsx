import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

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
                `foods/reservation/${reservationId}/complete/`
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
        <div>
            <h1>My Reservations</h1>

            {error && <p>{error}</p>}

            {reservations.length === 0 ? (
                <p>You haven't reserved any food yet.</p>
            ) : (
                <div>
                    {reservations.map((reservation) => (
                        <div key={reservation.id}>
                            <h2>{reservation.food_title}</h2>

                            <p>
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

                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}