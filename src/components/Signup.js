import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import apiServicelogin from '../services/apiSerivcesLogin';

const Signup = () => {
    const [detail, setDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const submit = async () => {
        try {
            const response = await apiServicelogin.post('/auth/signup', detail);
            console.log('Signup Successful:', response.data)
            navigate("/api/auth/signin")

        } catch (error) {
            console.error('Signup Failed:', error);
        }
    };
    const is_login = localStorage.getItem('token');
    let navigate = useNavigate();

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2><i className="bi bi-person-plus"></i> Sign Up</h2>
                {is_login ? (
                    <div className="auth-alert">
                        You are already logged in. Logout first to create a new account.
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                onChange={(e) => setDetails({ ...detail, firstname: e.target.value })}
                                type="text"
                                placeholder="John"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                onChange={(e) => setDetails({ ...detail, lastname: e.target.value })}
                                type="text"
                                placeholder="Doe"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                onChange={(e) => setDetails({ ...detail, email: e.target.value })}
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                onChange={(e) => setDetails({ ...detail, password: e.target.value })}
                                type="password"
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        <button className="btn-primary-custom" onClick={submit}>
                            <i className="bi bi-check-circle"></i> Create Account
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
export default Signup
