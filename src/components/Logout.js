import '../App.css';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const is_login = localStorage.getItem('token');
    let navigate = useNavigate();

    const logout = () => {
        console.log("Logging out:" + localStorage.getItem('username') )
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="logout-wrapper">
            <div className="logout-card">
                <div className="logout-icon">
                    <i className="bi bi-box-arrow-right"></i>
                </div>
                {is_login ? (
                    <>
                        <h3>Ready to leave?</h3>
                        <p>You will be logged out of your account.</p>
                        <button className="btn-danger-solid" onClick={logout}>
                            <i className="bi bi-power"></i> Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <h3>You're not logged in</h3>
                        <p>Log in to access your account.</p>
                    </>
                )}
            </div>
        </div>
    )
}
export default Logout
