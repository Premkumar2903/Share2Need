import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function FoodDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [food, setFood] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [reserving, setReserving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchFood = async () => {
        try {
            const response = await api.get(`/foods/${id}/`);

            console.log("Food details:", response.data);

            setFood(response.data);

        } catch (error) {
            console.error(error);
            setError("Unable to load food details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFood();
    }, [id]);



const handleReserve = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (quantity <= 0) {
        setError("Quantity must be greater than 0.");
        return;
    }

    try {

        setReserving(true);

        const response = await api.post("/foods/reservation/", {
            food: food.id,
            quantity: Number(quantity)
        });

        console.log("Reservation successful:", response.data);

        setSuccess("Food reserved successfully!");

        // Refresh food details
        fetchFood();

    } catch (error) {

        console.error("Reservation failed:", error);

        console.log("Status:", error.response?.status);
        console.log("Backend response:", error.response?.data);

        if (error.response?.data) {

            setError(
                JSON.stringify(error.response.data)
            );
        } else {
            setError("Unable to reserve food.");
        }

    } finally {
        setReserving(false);
    }
};



    if (loading) {
        return <p>Loading food details...</p>;
    }

    if (error && !food) {
        return <p>{error}</p>;
    }

    if (!food) {
        return <p>Food not found.</p>;
    }


    return (
        <div>

            <h1>{food.title}</h1>

            <p>
                <strong>Description:</strong>{" "}
                {food.description}
            </p>

            <p>
                <strong>Food Type:</strong>{" "}
                {food.food_type}
            </p>

            <p>
                <strong>Quantity:</strong>{" "}
                {food.quantity} {food.unit}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {food.status}
            </p>

            <p>
                <strong>Available From:</strong>{" "}
                {food.available_from}
            </p>

            <p>
                <strong>Available Until:</strong>{" "}
                {food.available_until}
            </p>

            <p>
                <strong>Pickup Address:</strong>{" "}
                {food.pickup_address}
            </p>


            <hr />


            {food.status === "AVAILABLE" ? (

                <div>

                    <h2>Reserve Food</h2>

                    <form onSubmit={handleReserve}>

                        <label>
                            Quantity:
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                        />

                        <button
                            type="submit"
                            disabled={reserving}
                        >
                            {reserving
                                ? "Reserving..."
                                : "Reserve Food"
                            }
                        </button>

                    </form>

                </div>

            ) : (

                <p>
                    This food is currently not available
                    for reservation.
                </p>

            )}


            {error && (
                <p>{error}</p>
            )}

            {success && (
                <p>{success}</p>
            )}


            <br />

            <Link to="/receiver/foods">
                Back to Available Food
            </Link>

            <br />

            <button onClick={() => navigate("/receiver/dashboard")}>
                Go to Dashboard
            </button>

        </div>
    );
}