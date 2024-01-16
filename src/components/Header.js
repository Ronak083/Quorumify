
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/api">MyQuora</Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper">
                        <Link to="/api/auth/signup">Signup</Link>
                        <Link to="/api/auth/signin">Login</Link>
                        <Link to="/api/admin">Admin Panel</Link>
                        <Link to="/api/logout">Logout</Link>
                        <Link to="/api">User: {localStorage.getItem('username')}</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header