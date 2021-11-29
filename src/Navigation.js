import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
function Navigation() {

  return (
    <Row>
      <Col>
        <Navbar bg="light" variant="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Anthm Demo Project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Employees List</Nav.Link>
                <Nav.Link href="/create">Create Employees</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
};
export default Navigation;
