import '../App.css';
import React, { useState, useEffect } from 'react';
import update from '../assest/update.png'
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
            <div className="highlighted-text">

            
            <span>Name: <u className="highlighted-text">{data.firstName} {data.lastName}</u></span> <br></br>
            <span>Email: {data.email} | Role: {data.role}</span>
            <div className="input-wrapper">            
            <span>Bio: {data.bio || 'No bio available'}
            </span>
            <input className="reply-input form-control" placeholder='New Bio' type="text" onChange={(e) => setBio({ bio : e.target.value})}/><button className="upload-btn-img" onClick={() => updateBio()}><img className="upload-btn-img" src={update} alt="upload"/></button>
            </div>
            </div>
        </div>
    );
};
export default Userpage