import { Table, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Pagination from "react-bootstrap/Pagination";

import { Context, Actions } from "../store";
import { getEmployees, searchEmployees } from "../store/api/EmployeeAPI";
import EmployeeSearch from "./EmployeeSearch";
function EmployeeList() {
  const { store, dispatch } = useContext(Context);
  const { employees } = store;
  const [keywords, setKeywords] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    searchEmployees(keywords).then((data) => {
      dispatch({ type: Actions.FETCH_EMPLOYEES_DATA, payload: data });
    });
    event.preventDefault();
  };

  const NavigateToPage = async function (page) {
    let data = await getEmployees(page);
    dispatch({ type: Actions.FETCH_EMPLOYEES_DATA, payload: data });
  };

  useEffect(async () => {
    await NavigateToPage(0);
    // let data = await getEmployees();
    // dispatch({ type: Actions.FETCH_EMPLOYEES_DATA, payload: data });
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h2>Employees List</h2>
        </Col>
      </Row>
      <EmployeeSearch searchHandler={handleSubmit} setKeywords={setKeywords}/>
      <Row>
        <Col>
          <Col>Total number of employees: {employees.totalElements}</Col>
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
          {employees && employees.content ? (
            <Pagination>
              <Pagination.First
                disabled={employees.first}
                onClick={() => NavigateToPage(0)}
              />
              <Pagination.Prev
                disabled={employees.first}
                onClick={() => NavigateToPage(employees.number - 1)}
              />
              <Pagination.Item disabled>
                Page: {employees.number + 1 + " of " + employees.totalPages}
              </Pagination.Item>
              <Pagination.Next
                disabled={employees.last}
                onClick={() => NavigateToPage(employees.number + 1)}
              />
              <Pagination.Last
                disabled={employees.last}
                onClick={() => NavigateToPage(employees.totalPages-1)}
              />
            </Pagination>
          ) : null}
        </Col>
      </Row>
    </>
  );
}
export default EmployeeList;
