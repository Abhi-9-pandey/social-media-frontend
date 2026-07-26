export default function ProfileCard({ profile, followData, onFollowToggle, isOwnProfile }) {
    if (!profile) return null;

    return (
        <div className="profile-card" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            {profile.profilePictureUrl && (
                <img src={profile.profilePictureUrl} alt="Profile" width="100" style={{ borderRadius: "50%" }} />
            )}
            
            {/* Updated to match DTO fields */}
            <h2>{profile.firstName} {profile.lastName}</h2>
            <h4>@{profile.username}</h4>
            <p>{profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Phone:</strong> {profile.phoneNumber}</p>
            
            {followData && (
                <div style={{ display: "flex", gap: "15px", margin: "15px 0" }}>
                    <span><strong>{followData.followers}</strong> Followers</span>
                    <span><strong>{followData.following}</strong> Following</span>
                </div>
            )}

            {!isOwnProfile && followData && (
                <button onClick={onFollowToggle}>
                    {followData.followingUser ? "Unfollow" : "Follow"}
                </button>
            )}
        </div>
    );
}