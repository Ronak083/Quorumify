import '../App.css';
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiServices';

const Userpage = () => {

    const [data, setData] = useState([]);
    const [bio, setBio] = useState({
        bio: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('auth/loggedinUserInfo');
                setData(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("error Fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const updateBio = async () => {
        try {
            const response = await apiService.put('user/updateUserBio', bio);
            setData(response.data);
            setBio(' ');
            console.log(response.data);

        } catch (error) {
            console.error("error updating user Bio: ", error);
        }


    };

    const getInitial = () => {
        if (data.firstName) return data.firstName.charAt(0).toUpperCase();
        return '?';
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="profile-avatar">{getInitial()}</div>
                <div className="profile-name">{data.firstName} {data.lastName}</div>
                <div className="profile-info">
                    <i className="bi bi-envelope" style={{ marginRight: '0.35rem' }}></i>
                    {data.email}
                </div>
                <div className="profile-info">
                    <i className="bi bi-shield" style={{ marginRight: '0.35rem' }}></i>
                    <span className={`role-badge role-badge-${data.role ? data.role.toLowerCase() : 'user'}`}>
                        {data.role}
                    </span>
                </div>

                <div className="profile-section">
                    <h6>Bio</h6>
                    <p className="profile-bio">{data.bio || 'No bio available'}</p>
                    <div className="input-group-custom">
                        <input
                            placeholder="Write a new bio..."
                            type="text"
                            onChange={(e) => setBio({ bio: e.target.value })}
                        />
                        <button className="btn-primary-custom" onClick={() => updateBio()}>
                            <i className="bi bi-pencil"></i> Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Userpage
