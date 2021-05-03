import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import LikedPerson from './LIkedPerson';
import Spinner from './layout/Spinner';
import {
  getCompanyProfiles,
  getEmployeeProfiles,
  getCurrentEmployeeProfile,
  getCurrentCompanyProfile,
} from '../actions/profile';

const LonelyCompany = ({
  getCompanyProfiles,
  getEmployeeProfiles,
  getCurrentEmployeeProfile,
  getCurrentCompanyProfile,
  auth,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getEmployeeProfiles();
    getCurrentEmployeeProfile();
  }, [
    getCurrentEmployeeProfile,
    getCompanyProfiles,
    getEmployeeProfiles,
    getCurrentCompanyProfile,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p>People you liked...let's hope they like you</p>
          {profiles
            .filter((profile) =>
              profile.likedby.some((item) => item['user'] === auth.user._id)
            )
            .map((profile) => (
              <LikedPerson
                key={profile._id}
                profile={profile}
                className='tinderCards__cardContainer'
              />
            ))}
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
  getCompanyProfiles,
  getEmployeeProfiles,
  getCurrentEmployeeProfile,
  getCurrentCompanyProfile,
})(LonelyCompany);
