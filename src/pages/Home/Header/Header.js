import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import CustomLink from "../../Shared/CustomLink";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="/" className=" text-warning fw-bold">
          Royal CARS
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={CustomLink} to="/" active>
                Home
              </Nav.Link>
              <Nav.Link as={CustomLink} to="/blog">
                Blog
              </Nav.Link>

              {!user ? (
                <Nav.Link as={CustomLink} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={CustomLink} to="/inventory">
                    Inventory
                  </Nav.Link>
                  <Nav.Link as={CustomLink} to="/myItem">
                    My Item
                  </Nav.Link>
                  {/* <Nav.Link as={CustomLink} to="/addItem">
                    Add Item
                  </Nav.Link> */}
                  <button
                    className="btn btn-warning h-50 my-auto fw-bold"
                    onClick={handleSignOut}
                  >
                    Sign-Out
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
