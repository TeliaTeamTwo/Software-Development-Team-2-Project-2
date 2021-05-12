import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeDashboardActions.scss';

const EmployeeDashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-employee-profile'>
        <button>Edit Profile</button>
      </Link>
      <Link to='/add-experience'>
        <button>Add Experience</button>
      </Link>
      <Link to='/add-education'>
        <button>Add Education</button>
      </Link>
    </div>
  );
};

export default EmployeeDashboardActions;
