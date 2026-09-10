return (
    <main className="create-food-page">

        <section className="create-food-container">

            <div className="create-food-header">
                <p className="page-label">DONOR • FOOD LISTING</p>

                <h1>Create Food Listing</h1>

                <p>
                    Share your surplus food and help someone in your
                    community.
                </p>
            </div>


            <form
                onSubmit={handleSubmit}
                className="create-food-form"
            >

                {/* Basic Food Information */}

                <div className="form-section">

                    <div className="form-section-header">
                        <h2>Food Information</h2>
                        <p>Tell receivers what food you are sharing.</p>
                    </div>


                    <div className="form-group">

                        <label htmlFor="title">
                            Food Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="e.g. Vegetable Rice"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            placeholder="Describe the food..."
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="food_type">
                                Food Type
                            </label>

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
                                placeholder="e.g. 10"
                                value={formData.quantity}
                                onChange={handleChange}
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
                                placeholder="e.g. meals"
                                value={formData.unit}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                {/* Availability */}

                <div className="form-section">

                    <div className="form-section-header">
                        <h2>Availability</h2>
                        <p>
                            Let receivers know when the food can be
                            collected.
                        </p>
                    </div>


                    <div className="form-row">

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

                            <label htmlFor="available_until">
                                Available Until
                            </label>

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

                </div>


                {/* Pickup Location */}

                <div className="form-section">

                    <div className="form-section-header">
                        <h2>Pickup Location</h2>
                        <p>
                            Provide the location where the food can
                            be collected.
                        </p>
                    </div>


                    <div className="form-group">

                        <label htmlFor="pickup_address">
                            Pickup Address
                        </label>

                        <textarea
                            id="pickup_address"
                            name="pickup_address"
                            placeholder="Enter pickup address"
                            value={formData.pickup_address}
                            onChange={handleChange}
                            rows="3"
                            required
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="latitude">
                                Latitude
                            </label>

                            <input
                                id="latitude"
                                type="number"
                                step="any"
                                name="latitude"
                                placeholder="e.g. 13.0827"
                                value={formData.latitude}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="longitude">
                                Longitude
                            </label>

                            <input
                                id="longitude"
                                type="number"
                                step="any"
                                name="longitude"
                                placeholder="e.g. 80.2707"
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


                <div className="create-food-actions">

                    <button
                        type="submit"
                        className="create-food-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Food Listing"
                        }
                    </button>

                </div>

            </form>

        </section>

    </main>
);