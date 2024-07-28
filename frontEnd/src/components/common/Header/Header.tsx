import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogOut } from "@store/auth/authSlice";
import { Badge, Navbar, Nav, Container,NavDropdown } from "react-bootstrap";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import styles from "./styles.module.css";
const { headerContainer, headerLogo } = styles;

const Header = () => {
  const { accessToken,user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">eCom</Badge>
        </h1>
        <HeaderLeftBar />
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>
            <Nav>

              {!accessToken ? <>
                <Nav.Link as={NavLink} to="login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="register">
                Register
              </Nav.Link>
              </> :
                <>
              <NavDropdown title={`Welcome: ${user?.FirstName} ${user?.LastName}`} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to='profile' >Profile</NavDropdown.Item>
              <NavDropdown.Item >Order</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to='/' onClick={()=>dispatch(authLogOut())} >LogOut</NavDropdown.Item>
            </NavDropdown>
              </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
