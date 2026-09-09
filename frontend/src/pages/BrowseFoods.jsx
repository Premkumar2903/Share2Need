
import { useState , useEffect} from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { MapPin, Utensils, Package, CookingPot,Search } from 'lucide-react';
import '../styles/foods.css'

export default function BrowseFoods() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    
    const [search, setSearch] = useState("");
    const [foodType, setFoodType] = useState("ALL");

    // filter food method from api
    const filteredFoods = foods.filter((food) => {

        const matchesSearch =

    // by search input
    // for food title "Vegetable Rice".includes("Rice") then displays
            food.title.toLowerCase().includes(search.toLowerCase()) ||
            food.description.toLowerCase().includes(search.toLowerCase()) ||
            food.pickup_address.toLowerCase().includes(search.toLowerCase());

    // by select field
        const matchesType =
            foodType === "ALL" ||
            food.food_type === foodType;

        return matchesSearch && matchesType;
    });


    const fetchFoods = async () => {
        try{
            const response = await api.get('/foods/')
            console.log("Foods response:", response.data);
            setFoods(response.data)
        }catch(error){
            console.log(error)
            setError('Unable to load available food')
        }finally{
            setLoading(false)
        }
 
    }

    useEffect(()=> {
        fetchFoods()
    },[])

    if(loading){
            return <p>Loading available food</p>
        }

  return (
    <main className='food-page'>

        <section className='food-page-header'>
            <h1>Available Food</h1>

            <p>
                Discover surplus food shared by donorsand reserve what you need.
            </p>
        </section>

        {/* filter section   */}
        <section className="food-filters">

            <div className="search-box">

                <Search size={19} />

                <input
                    type="text"
                    placeholder="Search food, location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            <select
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                className="food-filter-select"
            >
                <option value="ALL">All Food Types</option>
                <option value="VEGETARIAN">Vegetarian</option>
                <option value="NON_VEGETARIAN">
                    Non-Vegetarian
                </option>
                <option value="VEGAN">Vegan</option>
                <option value="OTHER">Other</option>
            </select>

        </section>
        

        {error && (
            <div className='food-error'>
                {error}
            </div>
        )}

        {foods.length === 0 ? (
            // loads when no food listing
            <section className='empty-food'>
                <h2>No food available</h2>

                <p>
                    There are currently no food listings available for reservation.
                </p>
            </section>
            
        ):(
            <section className='food-grid'>

                {/* maps filtered food */}
                {filteredFoods.map((food)=> (
                    <article
                        key={food.id}
                        className='food-card'
                     >

                        <div className='food-card-top'>
                            
                                <CookingPot/>
                            
                           <span className='food-status'>
                                {food.status}
                            </span> 
                        </div>

                        <h2>
                            {food.title}
                        </h2>

                        <p className='food-description'>
                            {food.description}
                        </p>

                        <div className='food-info'>
                            
                            <div className='food-info-item'>
                                <Utensils size={18}/>

                                <span>
                                    {food.food_type}
                                </span>
                            </div>

                            <div className='food-info-item'>
                                <Package size={18}/>
                                <span>
                                    {food.quantity} {food.unit}
                                </span>
                            </div>

                            <div className='food-info-item'>
                                <MapPin size={18}/>

                                <span>
                                    {food.pickup_address}
                                </span>
                            </div>
                        </div>

                        <Link
                            to={`/receiver/foods/${food.id}`}
                            className='food-details-btn'
                        >
                            View Details
                        </Link>

                        {/* <p>
                            Type: {food.food_type}
                        </p>

                        <p>
                            Quantity: {food.quantity}{" "}
                            {food.unit}
                        </p> */}

                        {/* <p>
                            Status: {food.status}
                        </p>

                        <p>
                            Pickup: {food.pickup_address}
                        </p> */}

                    </article>
                ))}


                {/* if total food length and matching keyword is none, no match */}
                {foods.length > 0 && filteredFoods.length === 0 && (
                <div className="no-filter-results">
                    <div>🔎</div>

                    <h2>No matching food found</h2>

                    <p>
                        Try a different food name, location, or food type.
                    </p>
                </div>
            )}

            </section>
        )}
    </main>
  )
}
