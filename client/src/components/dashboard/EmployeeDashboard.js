import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EmployeeDashboardActions from './EmployeeDashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentEmployeeProfile, deleteEmployeeAccount } from '../../actions/profile';
import './EmployeeDashboard.scss';

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
      <section className="employee-profile">     
      {profile !== null ? (
        <Fragment>
          <div className="image-header">
            <img src={profile.image}></img>
            <div className="header-container">
              <h1>{user.name}</h1>
            </div>
          </div>
          <div className="profile-text">
            <div className="text-part location">
              <p>{profile.location}</p>
            </div>
            <div className="text-part status">
              <p>{profile.status}</p>
            </div>
            <div className="text-part">
              <p>{profile.about}</p>
            </div>
            <div className="text-part skills">
              <label>Top Skills</label>
                <p>{profile.skills.join(', ')}</p>
            </div>
            <div className="text-part typeOfWork">
              <label>Looking for</label>
              <p>{profile.typeOfWork} position</p>
            </div>
            <div className="text-part links">
              <label>Links</label>
              <a href={profile.social.youtube}>{profile.social.youtube}</a>
              <a href={profile.social.linkedin}>{profile.social.linkedin}</a>
              <a href={profile.social.github}>{profile.social.github}</a>
              <a href={profile.social.website}>{profile.social.website}</a>
            </div>
          <Experience experience={profile.experience} />
          <Education education={profile.qualification} />
          <EmployeeDashboardActions />
          </div>
          <div className='delete-btn'>
            <button
              className='btn btn-danger'
              onClick={() => deleteEmployeeAccount()}
            >
            Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Redirect to='/create-employee-profile' />
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
  getCurrentEmployeeProfile,
  deleteEmployeeAccount,
})(EmployeeDashboard);
