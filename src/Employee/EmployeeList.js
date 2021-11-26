import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Context, Actions } from "../store";
import { getEmployees, searchEmployees } from "../store/api/EmployeeAPI";
function EmployeeList() {
  const { store, dispatch } = useContext(Context);
  const { employees } = store;
  const [keywords, setKeywords] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    searchEmployees(keywords).then((data) => {
      dispatch({ type: Actions.FETCH_EMPLOYEES_DATA, payload: data });
    });

    setValidated(true);
    event.preventDefault();
  };

  useEffect(async () => {
    let data = await getEmployees();
    dispatch({ type: Actions.FETCH_EMPLOYEES_DATA, payload: data });
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h2>Employees List</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            id="searchForm"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row>
              <Col>
                <Form.Control
                  required
                  placeholder="Enter keywords (Software Engineer, John,...)"
                  name="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </Col>
              <Col>
                <Button type="submit">Search</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Date of birth</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {employees && employees.content
                ? employees.content.map((employee) => {
                    return (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.designation}</td>
                        <td>
                          {new Date(employee.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td>{employee.phone}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
export default EmployeeList;
