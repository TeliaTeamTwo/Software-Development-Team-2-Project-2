import React from 'react';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import Employees from './components/Employees/Employees';

const App = () => {
  return (
    <div>
      <h1>Telia Project</h1>
      <EmployeeForm />
      <Employees />
    </div>
  );
};

export default App;
