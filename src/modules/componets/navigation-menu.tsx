import { useState, useEffect } from "react"
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const NavigationBar:React.FC = () => {
    const [isUserLogedIn, setIsUserLogedIn] = useState(false)
    const [userId, setUserId] = useState("")

    useEffect(()=>{
        try {
            const roleInfo = window.localStorage.getItem("M0NTY3ODkw")
            if (roleInfo) {
                const userData = JSON.parse(roleInfo)
                if (userData.userID) {
                    setUserId(userData.userID)
                    setIsUserLogedIn(true)
                }
            }
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <Navbar bg="light" expand="lg" fixed="top" className="navigation-bar">
            <Container className="container">
            <Navbar.Brand href="/">
                <img src="#" alt="logo" />
            </Navbar.Brand>
                {
                    !isUserLogedIn ? (
                        <Nav.Link href="/login">Log in</Nav.Link>
                    ):(
                        <Nav className="nav-container">
                                <img src="#" alt="user-profile-img" />
                            <NavDropdown title="" id="basic-nav-dropdown">
                                <NavDropdown.Item href={`/users/${userId}`}>Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/login">Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )
                }
            </Container>
        </Navbar>
    )
}