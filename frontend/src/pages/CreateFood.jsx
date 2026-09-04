import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toISOString } from "../utils.js/datetime";


export default function CreateFood() {

  const navigate = useNavigate();



    const [formData, setFormData] = useState({
        title: "",
        description: "",
        food_type: "VEGETARIAN",
        quantity: "",
        unit: "meals",
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
        <div>

            <h1>Create Food Listing</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Food Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Description</label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Food Type</label>

                    <select
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


                <div>
                    <label>Quantity</label>

                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Unit</label>

                    <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Available From</label>

                    <input
                        type="datetime-local"
                        name="available_from"
                        value={formData.available_from}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Available Until</label>

                    <input
                        type="datetime-local"
                        name="available_until"
                        value={formData.available_until}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Pickup Address</label>

                    <textarea
                        name="pickup_address"
                        value={formData.pickup_address}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Latitude</label>

                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Longitude</label>

                    <input
                        type="number"
                        step="any"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                    />
                </div>


                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Create Food Listing"
                    }
                </button>

            </form>


            {error && (
                <p>{error}</p>
            )}

        </div>
    );
}
