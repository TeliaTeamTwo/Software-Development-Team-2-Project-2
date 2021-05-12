import React, { Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CompanyProfileItem from './CompanyProfileItem';
import Match from '../Match'
import {
  getCompanyProfiles,
  getCurrentEmployeeProfile,
} from '../../actions/profile';

const CompanyProfiles = ({
  getCompanyProfiles,
  getCurrentEmployeeProfile,
  auth,
  profile: {profile, profiles, loading},
}) => {
  useEffect(() => {
    getCompanyProfiles();
    getCurrentEmployeeProfile();
  }, [getCompanyProfiles, getCurrentEmployeeProfile]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Company Profiles</h1>
          <p>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            companies around you
          </p>
          <div>
            {profiles.filter(
              (profile) =>
                !profile.likedby.some(
                  (item) => item['user'] === auth.user._id
                ) &&
                !profile.dislikedby.some(
                  (item) => item['user'] === auth.user._id
                )
            ).length > 0 ? (
              profiles
                .filter(
                  (profile) =>
                    !profile.likedby.some(
                      (item) => item['user'] === auth.user._id
                    ) &&
                    !profile.dislikedby.some(
                      (item) => item['user'] === auth.user._id
                    )
                )
                .map((profile) => (
                  <CompanyProfileItem
                    key={profile._id}
                    profile={profile}
                    profiles={profiles}
                    className='tinderCards__cardContainer'
                  />
                ))
            ) : (
              <Fragment>
                <h4>No new profiles</h4>
                <Match
                  profiles={profiles}
                  loading={loading}
                  auth={auth}
                  profile={profile}
                />
              </Fragment>
            )}
          </div>
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
  getCurrentEmployeeProfile,
})(CompanyProfiles);
