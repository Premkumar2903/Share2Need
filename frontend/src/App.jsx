
import { useEffect, useState } from "react";
import React from 'react'
import api from "./services/api";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import DonorDashboard from "./pages/donor/DonorDashboard";
import ReceiverDashboard from "./pages/receiver/ReceiverDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateFood from "./pages/CreateFood";
import MyFoods from "./pages/MyFoods";
import EditFood from "./pages/EditFood";
import BrowseFoods from "./pages/BrowseFoods";
import FoodDetails from "./pages/FoodDetails";
import MyReservations from "./pages/receiver/MyReservation";
import DonorReservations from "./pages/donor/DonorReservations";

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
            <Route path="/donor/dashboard" 
                element={  
                    <ProtectedRoute allowedRole={'DONOR'}>
                        <DonorDashboard/>
                    </ProtectedRoute> 
                }/>
            <Route path="/receiver/dashboard" 
                element={
                    <ProtectedRoute>
                        <ReceiverDashboard/>
                    </ProtectedRoute>
                }
            />

            <Route path="/donor/foods/create"
                element={
                    <ProtectedRoute allowedRole={'DONOR'}>
                        <CreateFood />
                    </ProtectedRoute>
                }
            />

            <Route path="/donor/foods"
                element={
                    <ProtectedRoute>
                        <MyFoods/>
                    </ProtectedRoute>
                }
            />

            <Route path="/donor/foods/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditFood/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/receiver/foods"
                element={
                    <ProtectedRoute allowedRole={'RECEIVER'}>
                        <BrowseFoods/>
                    </ProtectedRoute>
                }
            />

            <Route 
                path="/receiver/foods/:id"
                element={
                    <ProtectedRoute allowedRole={'RECEIVER'}>
                        <FoodDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/receiver/reservations"
                element={
                    <ProtectedRoute>
                        <MyReservations/>
                    </ProtectedRoute>
                }
            />

            <Route 
                path="/donor/reservations"
                element={
                    <ProtectedRoute>
                       <DonorReservations/> 
                    </ProtectedRoute>
                    
                }
            />
        
        </Routes>

    </div>

  )
}

