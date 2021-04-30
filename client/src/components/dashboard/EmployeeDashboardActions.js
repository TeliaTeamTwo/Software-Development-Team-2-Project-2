import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeDashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-employee-profile' class='btn btn-light'>
        <i class='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-experience' class='btn btn-light'>
        <i class='fab fa-black-tie text-primary' /> Add Experience
      </Link>
      <Link to='/add-education' class='btn btn-light'>
        <i class='fas fa-graduation-cap text-primary' /> Add Education
      </Link>
    </div>
  );
};

export default EmployeeDashboardActions;
