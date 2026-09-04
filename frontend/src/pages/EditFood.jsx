import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import { toDateTimeLocal, toISOString } from "../utils.js/datetime";

function EditFood() {

    const { id } = useParams();

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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    // const formatDateTimeLocal = (dateTime) => {
    //     if (!dateTime) {
    //         return "";
    //     }

    //     const date = new Date(dateTime);

    //     const offset = date.getTimezoneOffset() * 60000;

    //     return new Date(date.getTime() - offset)
    //         .toISOString()
    //         .slice(0, 16);
    // };

    useEffect(() => {

        const fetchFood = async () => {

            try {

                const response = await api.get(
                    `/foods/${id}/`
                );

                const food = response.data;

                setFormData({
                    title: food.title || "",
                    description: food.description || "",
                    food_type: food.food_type || "VEGETARIAN",
                    quantity: food.quantity || "",
                    unit: food.unit || "meals",
                    available_from: toDateTimeLocal(food.available_from) ,
                    available_until: toDateTimeLocal(food.available_until) ,
                    pickup_address: food.pickup_address || "",
                    latitude: food.latitude || "",
                    longitude: food.longitude || "",
                });

            } catch (error) {

                console.error(error);

                setError("Unable to load food listing.");

            } finally {

                setLoading(false);
            }
        };

        fetchFood();

    }, [id]);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");

        const data = {
            ...formData,
            available_from: toISOString(formData.available_from),
            available_until: toISOString(formData.available_until),
        }

        try {

            await api.patch(
                `/foods/${id}/`,
                data
            );

            navigate("/donor/foods");

        } catch (error) {

            console.error(error);

            if (error.response?.data) {

                setError(
                    JSON.stringify(error.response.data)
                );

            } else {

                setError("Unable to update food listing.");
            }

        } finally {

            setSaving(false);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h1>Edit Food Listing</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Food Title: </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Description: </label>

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
                    <label>Quantity: </label>

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
                    <label>Unit: </label>

                    <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Available From: </label>

                    <input
                        type="datetime-local"
                        name="available_from"
                        value={formData.available_from}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Available Until: </label>

                    <input
                        type="datetime-local"
                        name="available_until"
                        value={formData.available_until}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Pickup Address: </label>

                    <textarea
                        name="pickup_address"
                        value={formData.pickup_address}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Latitude: </label>

                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Longitude: </label>

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
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

            </form>


            {error && (
                <p>{error}</p>
            )}

        </div>
    );
}

export default EditFood;