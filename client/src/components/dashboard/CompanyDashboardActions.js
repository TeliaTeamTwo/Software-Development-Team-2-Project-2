import React from 'react';
import { Link } from 'react-router-dom';

const CompanyDashboardActions = () => {
  return (
    <div >
      <Link to='/edit-company-profile'>
        <i class='fas fa-user-circle' /> Edit Profile
      </Link>
      <Link to='/add-open-position' >
        <i class='fas fa-graduation-cap text-primary' /> Add Open Positions
      </Link>
    </div>
  );
};

export default CompanyDashboardActions;