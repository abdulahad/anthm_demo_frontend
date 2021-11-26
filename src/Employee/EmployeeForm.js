import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Context, Actions } from "../store";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../store/api/EmployeeAPI";
function EmployeeForm() {
  let navigate = useNavigate();
  const { dispatch } = useContext(Context);
  const [employee, updateEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    designation: "",
    phone: "",
  });
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      createEmployee(employee).then((data)=>{
        if(data && data.error==true){
          alert('Invalid Entry, please check the fields.');
        }else{
          navigate("/", { replace: true });
        }
      });
    }
    setValidated(true);
    event.preventDefault();
  };
  function handleChange(evt) {
    const value = evt.target.value;
    updateEmployee({
      ...employee,
      [evt.target.name]: value,
    });
  }
  useEffect(() => {
    console.log(employee);
  }, [employee]);
  return (
    <>
      <h2>New Employee Form</h2>
      <Form
        id="employeeForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="employeeFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="John"
            name="firstName"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide employee first name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="employeeLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Petter"
            name="lastName"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide employee first name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="employeeEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            required
            type="email"
            placeholder="john@cirruslabs.com"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide valid email address
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="employeeDateOfBirth">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="06/17/1991"
            name="dateOfBirth"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide valid date of birth
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="employeeDesignation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Software Engineer"
            name="designation"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide designation
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            placeholder="5613099721"
            required
            pattern="[0-9]{10}"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone number.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
}
export default EmployeeForm;
