
import { useState , useEffect} from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function BrowseFoods() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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


    // const testReservations = async () => {
    //     try {
    //         const response = await api.get("/foods/reservation/my/");
    //         console.log("My reservations:", response.data);
    //     } catch (error) {
    //         console.log("Status:", error.response?.status);
    //         console.log("Response:", error.response?.data);
    //     }
    // };

  return (
    <div>
        <h1>Available Food</h1>

        {error && (
            <p>{error}</p>
        )}

        {foods.length === 0 ? (
            <p>No food available</p>
        ):(
            <div>
                {foods.map((food)=> (
                    <div key={food.id}>

                        <h2>
                            {food.title}
                        </h2>

                        <p>
                            {food.description}
                        </p>

                        <p>
                            Type: {food.food_type}
                        </p>

                        <p>
                            Quantity: {food.quantity}{" "}
                            {food.unit}
                        </p>

                        <p>
                            Status: {food.status}
                        </p>

                        <p>
                            Pickup: {food.pickup_address}
                        </p>

                        <Link
                            to={`/receiver/foods/${food.id}`}
                        >
                            View Details
                        </Link>

                        <hr />

                    </div>
                ))}



                {/* <button onClick={testReservations}>
                    Test My Reservations
                </button> */}
            </div>
        )}
    </div>
  )
}
