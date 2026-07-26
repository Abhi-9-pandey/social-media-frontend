import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

    const { logout } = useAuth();

    return (

        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 30px",
                borderBottom: "1px solid #ddd"
            }}
        >

            <h2>SocialMedia</h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"
                }}
            >

                <Link to="/">
                    Home
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>

    );
}