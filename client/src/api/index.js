import axios from 'axios';

const url = 'http://localhost:5000/employees';

export const fetchEmployees = () => axios.get(url);
export const createEmployee = (newEmployee) => axios.post(url, newEmployee);