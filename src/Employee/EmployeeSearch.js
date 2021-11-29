import { Table, Form, Row, Col, Button } from "react-bootstrap";

import { useState } from "react";
const EmployeeSearch = function (props) {
  return (
    <Row>
      <Col>
        <Form
          id="searchForm"
          onSubmit={props.searchHandler}
        >
          <Row>
            <Col>
              <Form.Control
                placeholder="Enter keywords (Software Engineer, John,...)"
                name="keywords"
                onChange={(e) => props.setKeywords(e.target.value)}
              />
            </Col>
            <Col>
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default EmployeeSearch;
