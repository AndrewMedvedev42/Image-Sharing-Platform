import { useState } from "react"
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const NavigationBar:React.FC = () => {
    const [isUserLogedIn, setIsUserLogedIn] = useState(false)
    return (
        <Navbar bg="light" expand="lg" fixed="top" className="navigation-bar">
            <Container className="container">
            <Navbar.Brand href="/">
                <img src="#" alt="logo" />
            </Navbar.Brand>
            <Nav.Link href="/login">Login page</Nav.Link>
                            <Nav.Link href="/signup">Signup page</Nav.Link>
                            <Nav.Link href="/images/0987654321">Image page</Nav.Link>
                {
                    !isUserLogedIn ? (
                        <Nav.Link href="/login">Log in</Nav.Link>
                    ):(
                        <Nav className="nav-container">
                                <img src="#" alt="user-profile-img" />
                            <NavDropdown title="" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/users/username">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/users/username/submit-image">Submit new image</NavDropdown.Item>
                                <NavDropdown.Item href="/login">Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )
                }
            </Container>
        </Navbar>
    )
}