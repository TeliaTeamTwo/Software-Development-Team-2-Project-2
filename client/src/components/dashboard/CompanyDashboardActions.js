import React from 'react';
import { Link } from 'react-router-dom';

const CompanyDashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to='/edit-company-profile'>
        <button>Edit Profile</button>
      </Link>
      <Link to='/add-open-position' >
        <button>Add Position</button>
      </Link>
    </div>
  );
};

export default CompanyDashboardActions;