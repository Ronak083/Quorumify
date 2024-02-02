import '../App.css';

import { useNavigate } from 'react-router-dom';
import arrow from "../assest/arrow.png"

import bye from '../assest/tuSiJaaRaheHo.png';

const styles = {
    section: {
        fontSize: "18px",
        color: "#292b2c",
        backgroundColor: "#fff",
        padding: "20px"
    },
}

const Logout = () => {
    const is_login = localStorage.getItem('token');
    let navigate = useNavigate();

    const logout = () => {
        console.log("Logging out:" + localStorage.getItem('username') )
        localStorage.clear();  
        navigate("/api");                   
        window.location.reload();
    }


    return (
        <div style={styles.section}>
            <h4 ><img className="authimg" src= {arrow} alt="upload-btn" />Logout Page</h4>
            
            {
                is_login ? <>
                     <span>Are you sure, </span> <button className='byebtn' onClick={logout}><img className="byeImg" src={bye} alt="upload-btn" /></button>

                </>
                    :
                    <>You are Already Logged-out, Login First</>
            }

        </div>
    )

}
export default Logout




