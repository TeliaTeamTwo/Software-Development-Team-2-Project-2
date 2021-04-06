import React, { useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import Employees from './components/Employees/Employees';
import { useDispatch } from 'react-redux';
import { getEmployees } from './actions/employees';

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <div>
      <h1>Telia Project</h1>
      <EmployeeForm />
      <Employees />
    </div>
  );
};

export default App;
