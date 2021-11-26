// - Libraries
// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// - Child Components
import EmployeeForm from "./Employee/EmployeeForm";
import EmployeeList from "./Employee/EmployeeList";

// - Store
import { Context, initialState, reducer } from "./store";

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store, dispatch }}>
      <Router>
        <Container>
          <Row>
            <Col>
              <Navbar bg="dark"  variant="dark" expand="lg">
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
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/create" element={<EmployeeForm />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </Context.Provider>
  );
}

export default App;
