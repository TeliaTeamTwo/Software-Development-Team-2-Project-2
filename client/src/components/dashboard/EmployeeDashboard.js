import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EmployeeDashboardActions from './EmployeeDashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentEmployeeProfile, deleteEmployeeAccount } from '../../actions/profile';

const EmployeeDashboard = ({
  getCurrentEmployeeProfile,
  deleteEmployeeAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentEmployeeProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <EmployeeDashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.qualification} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteEmployeeAccount()}
            >
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>What kind of profile you want to create?</p>
          <Link to='/create-employee-profile' className='btn btn-primary my-1'>
            Employee Profile
          </Link>
          <Link to='/create-company-profile' className='btn btn-primary my-1'>
            Company Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentEmployeeProfile,
  deleteEmployeeAccount,
})(EmployeeDashboard);
