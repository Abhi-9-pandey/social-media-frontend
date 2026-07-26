// src/pages/HomePage.jsx
import { useState } from "react";
import CreatePost from "../components/post/CreatePost";
import Feed from "../components/post/Feed";

export default function HomePage() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="container">
            <CreatePost onPostCreated={() => setRefresh(!refresh)} />
            <Feed refresh={refresh} />
        </div>
    );
}