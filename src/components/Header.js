import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import profile from "../assest/man.png";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
    const is_login = localStorage.getItem('token');
    const is_user = localStorage.getItem('role');
    return (
        <div>
            <Navbar className="headerbar" bg="dark" data-bs-theme="dark" >
                <Container>
                    <Navbar.Brand style={{ margin: "0", color: 'red' , fontFamily: 'cursive'}} className="quorumify" href="/"> Quorumify</Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper headerbar">
                        {
                            is_login ? 
                            <div style={{margin: "auth"}}>
                                {
                                    is_user === "ADMIN" ? <>
                                        <Link className="headerbar" to="/api/admin">Admin Panel</Link>
                                    </> : <>
                                    </>
                                }

                                <Link className="headerbar" to="/api/userinfo"><img style= {{width: "7%"}} className="authimg" src= {profile} alt="upload-btn" />  {localStorage.getItem('username')}</Link>
                                <Link className="headerbar" to="/api/logout">Logout</Link>
                            </div> : <div style={{margin: "auth"}}>
                                <Link className="headerbar" to="/api/auth/signup">Signup</Link>
                                <Link className="headerbar" to="/api/auth/signin">Login</Link>
                            </div>
                        }

                    </Nav>
                </Container>
            </Navbar>
        </div >
    )
}
export default Header