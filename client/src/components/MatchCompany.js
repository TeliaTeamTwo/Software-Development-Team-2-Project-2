import React, { Fragment, useEffect } from 'react';
import Spinner from './layout/Spinner';
import { connect } from 'react-redux';
import LikedPerson from './LIkedPerson';

import {
  getEmployeeProfiles,
  getCurrentCompanyProfile,
} from '../actions/profile';

const MatchCompany = ({
  getEmployeeProfiles,
  getCurrentCompanyProfile,
  auth,
  profile: { profile, profiles, loading },
}) => {
  {
    useEffect(() => {
      getEmployeeProfiles();
      getCurrentCompanyProfile();
    }, [getCurrentCompanyProfile, getEmployeeProfiles]);
    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {profiles
              .filter(
                (profile) =>
                  profile.likedby.some(
                    (item) => item['user'] === auth.user._id
                  ) &&
                  profile.likes.some((item) => item['user'] === auth.user._id)
              ).length >0?(
                <Fragment>
                <p>We found you a match</p>
            {profiles
              .filter(
                (profile) =>
                  profile.likedby.some(
                    (item) => item['user'] === auth.user._id
                  ) &&
                  profile.likes.some((item) => item['user'] === auth.user._id)
              )
              .map((profile) => (
                <LikedPerson
                  key={profile._id}
                  profile={profile}
                  className='tinderCards__cardContainer'
                />
              ))}</Fragment>):(
                  <Fragment>
                  <p>There's no one new around you.</p>
            <span className='pulse'>
              <img
                className='profile-img'
                src={profile.image || profile.logo}
                alt='You...'
              />
            </span>
            </Fragment>)
              
              }
          </Fragment>
        )}
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getEmployeeProfiles,
  getCurrentCompanyProfile,
})(MatchCompany);
