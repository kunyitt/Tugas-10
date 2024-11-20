import { useEffect, useState } from "react";
import { useProfileStore } from "../store/profileStore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/network";
import Avatar from "/src/assets/avatar.svg"

const UpdateProfile = () => {
    const { profile, getProfile, UpdateProfile } = useProfileStore();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            await getProfile();
        };
        fetchProfile();
    }, [getProfile]);

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setEmail(profile.email);
            setImageUrl(profile.photo_url);
        }
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profilData = {name, email, password, photo_url: imageUrl };
            if (!password) {
                delete profilData.password
            }
            await updateProfile(profilData);
            navigate('/');
        } catch (err) {
            console.log("error updating profile:", err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
        <div className="px-6 py-12 w-1/4 bg-base-200 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Edit Profile</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col items-center mb-2">
                    <img 
                        src={Avatar} 
                        alt="avatar" 
                        className="w-20 h-20 rounded-full border border-gray-300 mb-6"
                    />
                    <input 
                        type="text" 
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="input input-bordered w-full bg-base-300 text-base-content"
                    />
                </div>

                <input 
                    type="text" 
                    placeholder="Sarah"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full bg-base-300 text-base-content"
                    required
                />

                <input 
                    type="email" 
                    placeholder="sarah.santoso@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full bg-base-300 text-base-content"
                    required
                />

                <input 
                    type="password" 
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full bg-base-300 text-base-content"
                />

                <button 
                    type="submit" 
                    className="btn btn-primary w-full text-base font-medium"
                >
                   Submit
                </button>
            </form>
        </div>
    </div>
    );
};

export default UpdateProfile;