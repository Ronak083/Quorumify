import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css';
import apiService from '../services/apiServices';
const styles = {
    section: {
        fontSize: "18px",
        color: "#292b2c",
        backgroundColor: "#fff",
        padding: "20px"
    },
}

const Signup = () => {
    const [detail, setDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const submit = async () => {
        try {
            const response = await apiService.post('/auth/signup', detail);
            console.log('Signup Successful:', response.data)
            navigate("/api/auth/signin")

        } catch (error) {
            console.error('Signup Failed:', error);
        }
    };
    const is_login = localStorage.getItem('token');
    let navigate = useNavigate();

    return (
        <div style={styles.section}>
            <h2 className="">Signup</h2>
            {
                is_login ? <> You are Already Logged-in, Logout First</>
                    :
                    <>
                        <div className="form">
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, firstName: e.target.value })} type="text" placeholder="firstname" required />
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, lastName: e.target.value })} type="text" placeholder="lastname" required />
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, email: e.target.value })} type="email" placeholder="email" required />
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, password: e.target.value })} type="password" placeholder="password" required />
                            <button className="btn btn-primary" onClick={submit}>Login</button>
                        </div>
                    </>
            }

        </div>
    )
}
export default Signup