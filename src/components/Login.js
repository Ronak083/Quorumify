import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import apiService from '../services/apiServices';
import apiServicelogin from '../services/apiSerivcesLogin';

const Login = () => {
    const is_login = localStorage.getItem('token');
    let navigate = useNavigate();

    const [detail, setDetails] = useState({
        email: '',
        password: '',
    });

    const getUserInfo = async () => {

        try {
            const response = await apiService.get('auth/userDetail/');
            const { role } = response.data;
            const { username } = response.data;

            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
            console.log(response.data);

            if(role === "ADMIN"){
                navigate("/api/admin")
            } else{
                navigate("/")
            }
            window.location.reload();
        } catch (error) {
            console.error("Error While getting user Detail: ", error);
        }

    };

    function updateHeaders(token) {
        apiService.defaults.headers['Authorization'] = `Bearer ${token}`;
    };

    const handleLogin = async () => {
        try {
            const response = await apiServicelogin.post('/auth/signin', detail);
            setDetails(' ');
            localStorage.setItem('token', response.data.token);
            console.log(localStorage.getItem('token'));
            updateHeaders(localStorage.getItem('token'));
            getUserInfo();

            console.log("Logged in Successfully");


        } catch (error) {
            console.error('Login failed', error);
        }
    };


    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2><i className="bi bi-box-arrow-in-right"></i> Log In</h2>
                {is_login ? (
                    <div className="auth-alert">
                        You are already logged in. Logout first to switch accounts.
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                onChange={(e) => setDetails({ ...detail, email: e.target.value })}
                                type="text"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                onChange={(e) => setDetails({ ...detail, password: e.target.value })}
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button className="btn-primary-custom" onClick={handleLogin}>
                            <i className="bi bi-arrow-right-circle"></i> Sign In
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}; export default Login;
