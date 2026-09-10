import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { formatDateTime } from "../utils.js/datetime";
import '../styles/myfoods.css'

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
        <main className="my-foods-page">

            
            <section className="my-foods-header">
                <div>
                    <h1>My Food Listings</h1>

                    <Link to="/donor/foods/create"
                        className="create-food-link"
                    >
                        + Create Food Listing
                    </Link>
                </div>
                
            </section>

                {error && (
                    <div className="food-error">
                        {error}
                    </div>
                )}
            


                {foods.length === 0 ? (
                    <section className="empty-foods">
                        <h2>No food listings yet</h2>

                        <p>
                            You haven't created any food listings yet.
                            Share your surplus food to help someone in need.
                        </p>

                        <Link 
                            to="/donor/foods/create"
                            className="create-food-link"
                        >
                            Create Food Listing
                        </Link>
                    </section>
                    

                ) : (

                    <section className="my-foods-grid">

                        {foods.map((food) => (

                            <article key={food.id}
                                className="my-food-card" 
                            >
                                <div className="food-type-header">
                                    <div className="">
                                        <p>{food.food_type}</p>
                                        <h2>{food.title}</h2>
                                    </div>

                                    <span 
                                        className= {`status-badge status-${food.status.toLowerCase()}`}
                                    >
                                        {food.status}
                                    </span>
                                </div>

                                

                                <p className="my-food-description">
                                    {food.description}
                                </p>

                                <div className="my-food-info">

                                    <div className="my-food-info-item">
                                        <span>Quantity</span>

                                        <strong>
                                            {food.quantity} {food.unit}
                                        </strong>
                                    </div>
                                                             
                                                        
                                    <div className="my-food-info-item">
                                        <p>
                                            <span>Available From:</span>{" "}

                                            <strong >
                                                { formatDateTime (food.available_from)}
                                            </strong>
                                            
                                        </p>
                                    </div>

                                    <div className="my-food-info-item">
                                        <p>
                                            <span>Available Until:</span>{" "}
                                            <strong>
                                                {formatDateTime (food.available_until)}
                                            </strong>
                                            
                                        </p>
                                    </div>

                                </div>
                                
                                <div className="my-food-pickup">
                                    <span> Pickup Address</span>   
                                     <strong>
                                        {food.pickup_address}
                                    </strong>
                                </div>             
                                

                                <div className="my-food-actions">
                                    <Link
                                        to={`/donor/foods/${food.id}/edit`}
                                        className="edit-food-button"
                                    >
                                        Edit
                                    </Link>
                                
                                    

                                    <button
                                        className="cancel-food-button"
                                        onClick={() =>
                                            handleCancel(food.id)
                                        }
                                        disabled={
                                            food.status === "CANCELLED"
                                        }                            
                                    >
                                        {food.status === "CANCELLED"
                                            ? "Cancelled"
                                            : "Cancel"
                                        }
                                    </button>

                                    <button
                                       className="delete-food-button"
                                        onClick={() =>
                                            handleDelete(food.id)
                                        }
                                    >
                                        Delete
                                    </button>     
                                </div>
                            </article>

                        ))}

                    </section>
                )}

            

        </main>
    );
}

export default MyFoods;