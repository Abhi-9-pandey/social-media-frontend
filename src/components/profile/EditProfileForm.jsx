import { useState } from "react";

export default function EditProfileForm({ profile, onSave }) {
    // Updated to match DTO fields EXACTLY
    const [form, setForm] = useState({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
        bio: profile.bio || ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
            <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
            />
            <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
            />
            <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
            />
            <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Bio"
                rows="4"
            />
            <button onClick={() => onSave(form)}>
                Save
            </button>
        </div>
    );
}