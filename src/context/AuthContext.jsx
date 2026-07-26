// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    // Add state for the logged-in username
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("username"));

    // Update login to accept and store the username
    const login = (jwt, username) => {
        localStorage.setItem("token", jwt);
        localStorage.setItem("username", username);
        setToken(jwt);
        setLoggedInUser(username);
    };

    // Clear it on logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setLoggedInUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                loggedInUser, // Export it here
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}