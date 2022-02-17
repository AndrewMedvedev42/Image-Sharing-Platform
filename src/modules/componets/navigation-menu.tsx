import { useState, useEffect } from "react"
import { FaUserAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const NavigationBar:React.FC = () => {
    const [isUserLogedIn, setIsUserLogedIn] = useState(false)
    const [userId, setUserId] = useState("")

    const navDropdownTitle = (<FaUserAlt size={32}/>);

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
        <Navbar expand="lg" fixed="top" className="navigation_bar">
            <Container className="container">
            <Navbar.Brand className="main_navigation_container" href="/">
                <div className="logo_container">
                    <img src={`${process.env.PUBLIC_URL}/media/Kvazar_logo.svg`} alt="kvazar-logo"/>
                    <span className="website-name">Kvazar</span>
                </div>
                <Link to="/about" className="text_link">About</Link>
            </Navbar.Brand>
                {
                    !isUserLogedIn ? (
                        <Nav.Link href="/login">Log in</Nav.Link>
                    ):(
                        <Nav className="nav_container">
                            <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
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