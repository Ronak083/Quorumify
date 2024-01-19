import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
            <h2 className="">Logout</h2>
            
            {
                is_login ? <>
                    <h4> <p>Are you sure, you want to really logout</p> <Button onClick={logout}>Yes</Button> </h4>

                </>
                    :
                    <>You are Already Logged-out, Login First</>
            }

        </div>
    )

}
export default Logout




