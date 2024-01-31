import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
    const is_login = localStorage.getItem('token');
    const is_user = localStorage.getItem('role');
    return (
        <div>
            <Navbar className="headerbar" bg="dark" data-bs-theme="dark" >
                <Container>
                    <Navbar.Brand style={{ color: 'red' , fontFamily: 'cursive'}} className="quorumify" href="/api">Quorumify</Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper headerbar">
                        {
                            is_login ? <>
                                {
                                    is_user === "ADMIN" ? <>
                                        <Link className="headerbar" to="/api/admin">Admin Panel</Link>
                                    </> : <>
                                    </>
                                }

                                <Link className="headerbar" to="/api/userinfo">User: {localStorage.getItem('username')}</Link>
                                <Link className="headerbar" to="/api/logout">Logout</Link>
                            </> : <>
                                <Link className="headerbar" to="/api/auth/signup">Signup</Link>
                                <Link className="headerbar" to="/api/auth/signin">Login</Link>
                            </>
                        }

                    </Nav>
                </Container>
            </Navbar>
        </div >
    )
}
export default Header