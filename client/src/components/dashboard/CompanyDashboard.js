import React, { Fragment, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
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
  }, [getCurrentCompanyProfile]);

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
        <Redirect to="create-company-profile"/>
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
