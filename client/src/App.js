import React, { useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import Employees from './components/Employees/Employees';
import { useDispatch } from 'react-redux';
import { getEmployees } from './actions/employees';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <div>
      <h1>Telia Project</h1>
      <BrowserRouter>
        <li><Link to="/employeeForm">Employee Form</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <Switch>
          <Route path="/employeeForm" component={EmployeeForm} exact />
          <Route path="/employees" component={Employees} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
