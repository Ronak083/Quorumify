import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css';
import apiServicelogin from '../services/apiSerivcesLogin';
import signuplogo from '../assest/sign-up.png';
import signup from '../assest/signup.png';
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
        <div style={styles.section}>
            <h2 className=""><img className="authimg" src= {signuplogo} alt="upload-btn" /> Sign-up</h2>
            {
                is_login ? <> You are Already Logged-in, Logout First</>
                    :
                    <>
                        <div className="form">
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, firstname: e.target.value })} type="text" placeholder="firstname" required />
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, lastname: e.target.value })} type="text" placeholder="lastname" required />
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, email: e.target.value })} type="email" placeholder="email" required />
                            <input className="form-control" onChange={(e) => setDetails({ ...detail, password: e.target.value })} type="password" placeholder="password" required /><br></br>
                            <button className="authbtn" onClick={submit}><img className="authimg" src= {signup} alt="upload-btn" /></button>
                        </div>
                    </>
            }

        </div>
    )
}
export default Signup