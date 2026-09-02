import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("access_token")
    );

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    const login = async(accessToken, refreshToken) => {

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        try {

            const response = await api.get("/me/");

            setUser(response.data);
            setIsLoggedIn(true);

            return response.data;

        } catch (error) {

            logout();

            throw error;
        }
    };


    const logout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setIsLoggedIn(false);
        setUser(null);
    };


    const getCurrentUser = async () => {

        try {

            const response = await api.get("/me/");

            setUser(response.data);

        } catch (error) {

            console.error("Unable to get current user", error);

            logout();

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (token) {
            getCurrentUser();
        } else {
            setLoading(false);
        }

    }, []);


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export  function useAuth() {

    return useContext(AuthContext);
}