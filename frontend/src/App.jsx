
import { useEffect, useState } from "react";
import React from 'react'
import api from "./services/api";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
export default function App() {

  const [foods, setFoods] = useState([]);

//   useEffect(() => {

//         api.get("/foods/")
//             .then(response => {
//                 console.log(response.data);
//                 setFoods(response.data);
//             })
//             .catch(error => {
//                 console.error(error);
//             });

//     }, []);

  return (
    <div>
        {/* <h1 className="bg-amber-300 text-4xl">Share 2 need</h1>

        {foods.map(food => (
            <div key={food.id}>
                <h3>{food.title}</h3>
                <p>{food.description}</p>
                <p>
                    Quantity: {food.quantity} {food.unit}
                </p>
            </div>
        ))} */}
        <Navbar/>

        <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>

    </div>

  )
}

