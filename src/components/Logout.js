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
        localStorage.clear();
        navigate("/api")
    }


    return (
        <div style={styles.section}>
            <h2 className="">Logout</h2>
            {
                is_login ? <>
                    <p> <h4>Are sure, you want to really logout</h4> <Button onClick={logout}>Yes</Button> </p>

                </>
                    :
                    <> You are Already Logged-out, Login First</>
            }

        </div>
    )

}
export default Logout




