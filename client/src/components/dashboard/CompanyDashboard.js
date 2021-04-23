import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CompanyDashboardActions from './CompanyDashboardActions';
import OpenPosition from './OpenPosition';
import {
  getCurrentCompanyProfile,
  deleteCompanyAccount,
} from '../../actions/profile';

const CompanyDashboard = ({
  getCurrentCompanyProfile,
  deleteCompanyAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentCompanyProfile();
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
          <CompanyDashboardActions />
          <OpenPosition openPositions={profile.openPositions} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteCompanyAccount()}
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
  getCurrentCompanyProfile,
  deleteCompanyAccount,
})(CompanyDashboard);
