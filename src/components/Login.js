import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import key from '../assest/key.png';
import loginlogo from '../assest/password.png';
import apiService from '../services/apiServices';
import apiServicelogin from '../services/apiSerivcesLogin';
const styles = {
    section: {
        fontSize: "18px",
        color: "#292b2c",
        backgroundColor: "#fff",
        padding: "20px"
    },
}


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
        <div style={styles.section}>
            <h2><img className="authimg" src= {loginlogo} alt="upload-btn" /> Log in</h2>
            {
                is_login ? <> You are Already Logged-in, Logout First</>
                    :
                    <div className="form">

                        <input className="form-control" onChange={(e) => setDetails({ ...detail, email: e.target.value })} type="text" placeholder="username" />
                        <input className="form-control" onChange={(e) => setDetails({ ...detail, password: e.target.value })} type="password" placeholder="password" /> <br></br>
                        <button className="authbtn" onClick={handleLogin}><img className="authimg" src={key} alt="upload-btn" /></button>

                    </div>
            }


        </div>
    );
}; export default Login;