import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
    const is_login = localStorage.getItem('token');
    const is_user = localStorage.getItem('role');
    return (
        <Navbar className="navbar-custom" expand="sm">
            <Container>
                <Navbar.Brand href="/">
                    <span>Q</span>uorumify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="nav" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.25rem' }}></i>
                </Navbar.Toggle>
                <Navbar.Collapse id="nav">
                    <Nav className="ms-auto">
                        <div className="nav-links">
                            {is_login ? (
                                <>
                                    {is_user === "ADMIN" && (
                                        <Link to="/api/admin">
                                            <i className="bi bi-shield-lock"></i> Admin
                                        </Link>
                                    )}
                                    <Link to="/api/userinfo">
                                        <i className="bi bi-person-circle"></i> {localStorage.getItem('username')}
                                    </Link>
                                    <span className={`role-badge role-badge-${is_user ? is_user.toLowerCase() : 'user'}`}>
                                        {is_user}
                                    </span>
                                    <Link to="/api/logout">
                                        <i className="bi bi-box-arrow-right"></i> Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/api/auth/signup">Sign Up</Link>
                                    <Link to="/api/auth/signin">Log In</Link>
                                </>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header
