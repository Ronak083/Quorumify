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





    return (
        <div className="user-detail-container">
            <h2>Name: <u>{data.firstName} {data.lastName}</u></h2>
            <h3>Email: {data.email} | Role: {data.role}</h3>
            <h4>Bio: {data.bio || 'No bio available'}
            </h4>
            <input placeholder='New Bio' type="text" onChange={(e) => setBio({ bio : e.target.value})}/><button onClick={() => updateBio()}>Update Bio</button>
        </div>
    );
};
export default Userpage