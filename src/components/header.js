import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("../", { replace: true });
    return;
  };
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>Gaurav Solanki Practical</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {!JSON.parse(localStorage.getItem("user")) ? (
              <Link to="/">Login</Link>
            ) : (
              <a
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={handleLogout}
              >
                Logout
              </a>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
