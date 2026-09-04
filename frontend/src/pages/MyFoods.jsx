import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { formatDateTime } from "../utils.js/datetime";

function MyFoods() {

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchFoods = async () => {

        try {

            const response = await api.get("/foods/");

            setFoods(response.data);

        } catch (error) {

            console.error(error);

            setError("Unable to load food listings.");

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchFoods();

    }, []);

    const handleCancel = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to Cancel this food listing?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.post(`/foods/${id}/cancel/`);
            // deleting food listing by filter food.id is not current food id
            setFoods((currentFoods) => 
                currentFoods.map((food)=>
                    food.id === id ?
                    {
                        ...food,
                        status: 'CANCELLED'
                    } :food
                )
            );

        } catch (error) {

            console.error(error);

            setError("Unable to delete food listing.");
        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this food listing?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/foods/${id}/`);
            // deleting food listing by filter food.id is not current food id
            setFoods(
                foods.filter((food) => food.id !== id)
            );

        } catch (error) {

            console.error(error);

            setError("Unable to delete food listing.");
        }
    };


    if (loading) {
        return <p>Loading food listings...</p>;
    }


    return (
        <div>

            <h1>My Food Listings</h1>

            <Link to="/donor/foods/create">
                + Create Food Listing
            </Link>

            {error && (
                <p>{error}</p>
            )}


            {foods.length === 0 ? (

                <p>
                    You haven't created any food listings yet.
                </p>

            ) : (

                <div>

                    {foods.map((food) => (

                        <div key={food.id}>

                            <h2>{food.title}</h2>

                            <p>
                                {food.description}
                            </p>

                            <p>
                                Food Type: {food.food_type}
                            </p>

                            <p>
                                Quantity: {food.quantity} {food.unit}
                            </p>

                            <p>
                                Status: {food.status}
                            </p>


                             <p>
                                <strong>Available From:</strong>{" "}
                                { formatDateTime (food.available_from)}
                            </p>

                            <p>
                                <strong>Available Until:</strong>{" "}
                                {formatDateTime (food.available_until)}
                            </p>
                                            
                            <p>
                                Pickup: {food.pickup_address}
                            </p>


                            <Link
                                to={`/donor/foods/${food.id}/edit`}
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() =>
                                    handleCancel(food.id)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(food.id)
                                }
                            >
                                Delete
                            </button>     

                            <hr />

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default MyFoods;