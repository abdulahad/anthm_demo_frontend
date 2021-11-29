import { apiFetch } from "./ApiHandler";

const URI = "http://localhost:8080";

const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getEmployees = async (pageNumber) => {
  let URI_Query = "/employees";
  if(pageNumber && !isNaN(pageNumber)){
    URI_Query = "/employees?pageNumber="+pageNumber;
  }
  const data = await apiFetch(URI + URI_Query, "GET", header);
  console.log(data);
  return data;
};

export const searchEmployees = async (keywords) => {
  const data = await apiFetch(URI + "/employees?keywords="+keywords, "GET", header);
  console.log(data);
  return data;
};

export const createEmployee = async (data) => {
  return await apiFetch(URI + "/employees/create", "POST", header, { ...data });
};

