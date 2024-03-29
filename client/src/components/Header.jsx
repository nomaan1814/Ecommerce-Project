import React, { useEffect } from "react";
import { Navbar, Nav, Container,NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import { logout } from "../actions/userAction";
const Header = () => {
  const userLogin=useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;
  const userUpdate=useSelector(state=>state.userUpdateProfile)
  const {userDetup}=userUpdate;
  const dispatch=useDispatch()
  const logoutHandler=()=>{
     dispatch(logout())
  }
  useEffect(()=>{

  },[userDetup])
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Online Shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i>
                  &nbsp; Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo?(
                  <NavDropdown title={userInfo.name} id="username">
                   <LinkContainer to="/profile">      
                <NavDropdown.Item>
                
                  {/* <i className="fa-solid fa-user"></i> */}
                     Profile
                 
                </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                </NavDropdown.Item>
             
                  </NavDropdown>
              ):(
                <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa-solid fa-user"></i>
                  &nbsp; Signin
                </Nav.Link>
              </LinkContainer>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
