import React from "react";

import { createEmployee } from "./api/EmployeeAPI";

const Actions = {
  FETCH_EMPLOYEES_DATA: "fetch_employee_data",
  CREATE_EMPLOYEE: "create_employee",
};

const initialState = { employees: [] };

const reducer = (state, action, payload) => {
  console.log(action.type);
  switch (action.type) {
    case Actions.FETCH_EMPLOYEES_DATA:
      return { employees: action.payload };
    case Actions.CREATE_EMPLOYEE:
      return createEmployee(action.payload);
    default:
      return state;
  }
};

const Context = React.createContext();

export { initialState, reducer, Context, Actions };
