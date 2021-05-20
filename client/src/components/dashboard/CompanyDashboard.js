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
import { logout } from '../../actions/auth';
import './CompanyDashboard.scss';

const CompanyDashboard = ({
  getCurrentCompanyProfile,
  deleteCompanyAccount,
  auth: { user },
  logout,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentCompanyProfile();
  }, [getCurrentCompanyProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="company-profile">
      {profile !== null ? (
        <Fragment>
          <div className="image-header">
            <img src={profile.logo} alt="profile_logo"></img>
            <div className="header-container">
              <h1>{user.name}</h1>
            </div>
          </div>
          <div className="profile-text">
            <div className="text-part location">
              <p>{profile.location}</p>
            </div>
            <div className="text-part">
              <p>{profile.about}</p>
            </div>
            <div className="text-part website">
              <label>Website</label>
              <a href={profile.website}>{profile.website}</a>
            </div>
            <OpenPosition openPositions={profile.openPositions} />
            <CompanyDashboardActions />
            <div className="text-part logout">
            <button className ="logout-btn" onClick={logout} href='#!'>
            Logout
            </button>
          </div>
          </div>
          <div className='delete-btn'>
            <button
              className='btn btn-danger'
              onClick={() => deleteCompanyAccount()}
            >
            Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Redirect to="create-company-profile"/>
      )}
      </section>
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
  logout,
})(CompanyDashboard);
