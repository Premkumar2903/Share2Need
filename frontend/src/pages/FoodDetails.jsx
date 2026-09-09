import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { formatDateTime } from "../utils.js/datetime";
import '../styles/foods.css'

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
        <main className="food-details-page">
            <section className="food-details-card">

            
                <div className="food-details-header">
                    <div>
                        <p className="page-label">Food Details:</p>
                        <h1>{food.title}</h1>
                    </div>

                    <span className={`status-badge status-${food.status.toLowerCase()}`}>
                        {food.status}
                    </span>
                </div>


                <div className="food-details-description">
                    <h2>Description</h2>{" "}
                    <p>{food.description}</p>
                </div>


                <div className="food-details-info">
                     <div className="food-details-item">
                        <span>Food Type:</span>{" "}
                        <strong>{food.food_type}</strong>
                    </div>

                    <div className="food-details-item"> 
                        <span>Quantity:</span>{" "}
                        <strong>
                            {food.quantity} {food.unit}
                        </strong>
                        
                    </div>
                </div>

                <div className="food-details-item">
                    <span>Available From:</span>
                    <strong>
                        {formatDateTime (food.available_until)}
                    </strong>
               </div>
               
               <div className="food-details-item">
                    <span>Available Until:</span>
                    <strong>
                        {formatDateTime (food.available_until)}
                    </strong>
               </div>
    
                <div className="food-details-item food-details-full">
                    <span>Pickup Address:</span>{" "}
                    <strong>{food.pickup_address}</strong>
                </div>




                {food.status === "AVAILABLE" ? (

                    <section className="reserve-section">
                        <div className="reserve-heading">
                            <h2>Reserve Food</h2>

                            <p>
                                Enter the quantity you need to reserve
                            </p>
                        </div>
                        

                        <form 
                            onSubmit={handleReserve}
                            className="reserve-form"
                        >
                            
                            <div className="quantity-field">
                                <label htmlFor="quantity">
                                    Quantity:
                                </label>

                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            

                            <button
                                type="submit"
                                className="reserve-btn"
                                disabled={reserving}
                            >
                                {reserving
                                    ? "Reserving..."
                                    : "Reserve Food"
                                }
                            </button>

                        </form>

                    </section>

                ) : (

                    <div className="food-unavailable">
                        <h2>Food Not Available</h2>
                        <p>
                            This food is currently not available
                            for reservation.
                        </p>
                    </div>
                    

                )}


                {error && (
                    <div className="food-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="food-success">
                        {success}
                    </div>
                )}


                <br />

                <div className="food-details-actions">
                    <Link to="/receiver/foods"
                        className="secondary-btn"
                    >
                        Back to Available Food
                    </Link>

                    <Link to={"/receiver/dashboard"}
                            className="dashboard-btn"    
                    >
                        Go to Dashboard
                    </Link>
                </div>    

           </section>
        </main>
    );
}