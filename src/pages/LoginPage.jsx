import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await loginUser({
                username,
                password
            });

            login(res.token, username);

            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Invalid username or password");
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>
                <p style={{ marginTop: "20px" }}>
                    Don’t have an account? <Link to="/register">Create one here</Link>
                </p>

            </form>


        </div>
    );
}