import React, { Fragment, useEffect } from 'react';
import Spinner from './layout/Spinner';
import { connect } from 'react-redux';

import {
  getCompanyProfiles,
  getCurrentEmployeeProfile,
} from '../actions/profile';

const Match = ({
  getCompanyProfiles,
  getCurrentEmployeeProfile,
  profile: { profile, loading },
}) => {
    {
  useEffect(() => {
    getCompanyProfiles();
    getCurrentEmployeeProfile();
  }, [getCurrentEmployeeProfile, getCompanyProfiles]);


  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p>There's no one new around you.</p>
          <span className='pulse'>
            <img className='profile-img' src={profile.image} alt='You...' />
          </span>
        </Fragment>
      )}
    </Fragment>
  );
}}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getCompanyProfiles,
  getCurrentEmployeeProfile,
})(Match);
