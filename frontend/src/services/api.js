import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(

    // If request succeeds
    (response) => {
        return response;
    },

    // If request fails
    async (error) => {

        const originalRequest = error.config;

        // Check if access token expired
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            const refreshToken =
                localStorage.getItem("refresh_token");

            if (refreshToken) {

                try {

                    const response = await axios.post(
                        "http://127.0.0.1:8000/api/refresh/", 
                        {
                            refresh: refreshToken,
                        }
                    );

                    const newAccessToken =
                        response.data.access;

                    localStorage.setItem(
                        "access_token",
                        newAccessToken
                    );

                    // Put new token into original request
                    originalRequest.headers.Authorization =
                        `Bearer ${newAccessToken}`;

                    // Try original request again
                    return api(originalRequest);

                } catch (refreshError) {

                    console.error(
                        "Refresh token failed:",
                        refreshError
                    );

                    localStorage.removeItem(
                        "access_token"
                    );

                    localStorage.removeItem(
                        "refresh_token"
                    );

                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api