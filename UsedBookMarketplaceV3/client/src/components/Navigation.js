import React, { useContext } from 'react'
import '../assets/workshop-styles.css'
import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../services'
import AuthContext from "../context/AuthContext";



const Navigation = () => {

	const navigate = useNavigate()
	const { setIsAuth, isAuth } = useContext(AuthContext);
	const logoutHandler = async() => {
	  const res = await logout();
	  console.log(res);
	  setIsAuth(false); 
	  navigate('/')
	}


  return (
	<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
	<Container>
	<Navbar.Brand>	<NavLink to="/" className={'nav_link'}>The BookStore</NavLink></Navbar.Brand>
	<Navbar.Toggle aria-controls="responsive-navbar-nav" />
	<Navbar.Collapse id="responsive-navbar-nav">
	  <Nav className="me-auto">
		<Nav.Link>
			<NavLink to="/sellbooks" className={'nav_link'}>Sell Textbooks</NavLink>
		</Nav.Link>
		<Nav.Link>
			<NavLink to="/cart" className={'nav_link'}>My Cart</NavLink>
		</Nav.Link>
		<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
			<NavDropdown.Item> 
			  <NavLink to="/sold">Recently Sold</NavLink>
		  	</NavDropdown.Item>

		  	<NavDropdown.Item> 
			  <NavLink to="/myStuff">My Stuff</NavLink>
		  	</NavDropdown.Item>
		
		</NavDropdown>
	  </Nav>
	  <Nav>
		<Nav.Link>
			{!isAuth&&<NavLink to="/register" className={'nav_link'}>Register</NavLink>}
		</Nav.Link>

		<Nav.Link>
			{!isAuth&&<NavLink to="/login" className={'nav_link'}>Login</NavLink>}
		</Nav.Link>

		<Nav.Link>
		{isAuth&&<button onClick={ logoutHandler } type="button" className="btn btn-success">Logout</button>}
		</Nav.Link>
	
	  </Nav>
	</Navbar.Collapse>
	</Container>
  </Navbar>
	);
}

export default Navigation