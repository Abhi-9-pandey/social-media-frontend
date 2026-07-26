import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyProfile, getProfile, updateMyProfile } from "../services/profileService";
import { getFollowStatus, followUser, unfollowUser } from "../services/followService";
import ProfileCard from "../components/profile/ProfileCard";
import EditProfileForm from "../components/profile/EditProfileForm";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
    const { username } = useParams();
    const { loggedInUser } = useAuth();
    const isOwnProfile = !username || username === loggedInUser; 

    const [profile, setProfile] = useState(null);
    const [followData, setFollowData] = useState(null);
    const [editing, setEditing] = useState(false);

    const loadProfileData = async () => {
        try {
            // 1. Load Profile
            const profileRes = isOwnProfile 
                ? await getMyProfile() 
                : await getProfile(username);
            
            setProfile(profileRes.data);

            // 2. Load Follow Data (using the user ID from the profile)
            if (profileRes.data && profileRes.data.id) {
                const followRes = await getFollowStatus(profileRes.data.id);
                setFollowData(followRes.data);
            }
        } catch (error) {
            console.error("Failed to load profile", error);
        }
    };

    useEffect(() => {
        loadProfileData();
    }, [username]);

    const handleSave = async (data) => {
        try {
            await updateMyProfile(data);
            setEditing(false);
            loadProfileData();
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    const handleFollowToggle = async () => {
        if (!profile || !followData) return;
        
        try {
            if (followData.followingUser) {
                await unfollowUser(profile.id);
            } else {
                await followUser(profile.id);
            }
            loadProfileData(); // Reload to get updated follower counts
        } catch (error) {
            console.error("Failed to toggle follow status", error);
        }
    };

    if (!profile) return <h2>Loading Profile...</h2>;

    return (
        <div className="container" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <ProfileCard 
                profile={profile} 
                followData={followData}
                onFollowToggle={handleFollowToggle}
                isOwnProfile={isOwnProfile}
            />

            {isOwnProfile && (
                <div style={{ marginTop: "20px" }}>
                    <button onClick={() => setEditing(!editing)}>
                        {editing ? "Cancel Edit" : "Edit Profile"}
                    </button>

                    {editing && (
                        <EditProfileForm
                            profile={profile}
                            onSave={handleSave}
                        />
                    )}
                </div>
            )}
        </div>
    );
}