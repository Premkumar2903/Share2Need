import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toISOString } from "../utils.js/datetime";
import '../styles/createfood.css'

export default function CreateFood() {

  const navigate = useNavigate();



    const [formData, setFormData] = useState({
        title: "",
        description: "",
        food_type: "VEGETARIAN",
        quantity: "",
        unit: "",
        available_from: "",
        available_until: "",
        pickup_address: "",
        latitude: "",
        longitude: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = {
                ...formData,
                available_from: toISOString(formData.available_from),
                available_until: toISOString(formData.available_until),
            };

            console.log("Sending:", data);

            const response = await api.post(
                "/foods/",
                data
            );

            console.log("Food created:", response.data);

            navigate("/donor/dashboard");

        } catch (error) {
            console.error("Food creation failed:", error);
            console.log("Status:", error.response?.status);

            setError(
                JSON.stringify(
                    error.response?.data || "Unable to create food."
                )
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="create-food-page">

            <section className="create-food-container">

                <div className="create-food-header"> 
                    
                    <h1 className="page-label">
                        Create Food Listing
                    </h1>

                    <p>
                        Share your surplus food and help someone in need
                    </p>
                </div>

                <form onSubmit={handleSubmit}
                    className="create-food-form"
                >

                    <div className="form-group">
                        <label>Food Title</label>

                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Vegetable Rice"
                        />
                    </div>


                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the food..."
                            rows={'3'}
                        />
                    </div>


                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="food_type">Food Type</label>

                            <select
                                id="food_type"
                                name="food_type"
                                value={formData.food_type}
                                onChange={handleChange}
                            >
                                <option value="VEGETARIAN">
                                    Vegetarian
                                </option>

                                <option value="NON_VEGETARIAN">
                                    Non-Vegetarian
                                </option>

                                <option value="VEGAN">
                                    Vegan
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">
                                Quantity
                            </label>

                            <input
                                id="quantity"
                                type="number"
                                name="quantity"
                                min="1"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="e.g. 10"
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="unit">
                                Unit
                            </label>

                            <input
                                id="unit"
                                type="text"
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                placeholder="e.g. meals"
                            />
                        </div>
                    </div>


                    <div className="form-section">
                    
                        <div className="form-group">
                            <label htmlFor="available_from">
                                Available From
                            </label>

                            <input
                                id="available_from"
                                type="datetime-local"
                                name="available_from"
                                value={formData.available_from}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Available Until</label>

                            <input
                                id="available_until"
                                type="datetime-local"
                                name="available_until"
                                value={formData.available_until}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                    </div>


                    <div className="form-section">

                        <div className="form-section-header">
                            <label>Pickup Address</label>
                            <p>
                                Provide the location where the food can
                                be collected.
                            </p>
                        </div>
                        

                        <div className="form-group">
                            <textarea
                                id="pickup_address"
                                name="pickup_address"
                                value={formData.pickup_address}
                                onChange={handleChange}
                                placeholder="Enter pickup address"
                                required
                                rows="2"
                            />
                        </div>
                        
                    

                        <div className="form-row">

                        
                            <div className="form-group">
                                <label htmlFor="latitude">Latitude</label>

                                <input
                                    id="tatitude"
                                    type="number"
                                    step="any"
                                    name="latitude"
                                    placeholder="eg. 13.0827"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="longitude">Longitude</label>

                                <input
                                    id="longitute"
                                    type="number"
                                    step="any"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>  
                    </div>


                    {error && (
                        <div className="food-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="create-food-button"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Food Listing"
                        }
                    </button>

                
              </form>

            </section>

        </main>
    );
}
