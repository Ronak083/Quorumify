import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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


const Login = () => {
    const is_login = localStorage.getItem('token');
    let navigate = useNavigate();
    
    const [detail, setDetails] = useState({
        email: '',
        password: '',
    });

    const getUserInfo = async (username) => {

        try {
            const response = await apiService.get(`auth/userDetail/${username}`);
            const { role } = response.data;
            localStorage.setItem('role', role);
            console.log(role);

        } catch (error) {
            console.error("Error While getting user Detail: ", error);
        }

    };

    const handleLogin = async () => {
        try {
            const response = await apiService.post('/auth/signin', detail)
            const { token } = response.data;
            const { username } = response.data;
            localStorage.setItem('username', username);
            localStorage.setItem('token', token);
            
            await getUserInfo(username);
            setDetails(' ');
            console.log("Logged in Successfully"); 
            const userrole = localStorage.getItem('role')
            if (userrole === "ADMIN") {
                navigate("/api/admin");
            } else {
                navigate("/api")
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    

    return (
        <div style={styles.section}>
            <h2>Log in</h2>
            {
                is_login ? <> You are Already Logged-in, Logout First</>
                    :
                    <div className="form">

                        <input className="form-control" onChange={(e) => setDetails({ ...detail, email: e.target.value })} type="text" placeholder="username" />
                        <input className="form-control" onChange={(e) => setDetails({ ...detail, password: e.target.value })} type="password" placeholder="password" />
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>

                    </div>
            }
            

        </div>
    );
}; export default Login;