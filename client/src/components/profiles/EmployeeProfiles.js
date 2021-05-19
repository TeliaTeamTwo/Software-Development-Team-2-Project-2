import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EmployeeProfileItem from './EmployeeProfileItem';
import Match from '../Match';
import {
  getEmployeeProfiles,
  getCurrentCompanyProfile,
} from '../../actions/profile';

const EmployeeProfiles = ({
  getEmployeeProfiles,
  getCurrentCompanyProfile,
  auth,
  profile: { profile, profiles, loading },
}) => {
  useEffect(() => {
    getEmployeeProfiles();
    getCurrentCompanyProfile();
  }, [getEmployeeProfiles, getCurrentCompanyProfile]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Employee Profiles</h1>
          <p>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            talent around you
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
                  <EmployeeProfileItem key={profile._id} profile={profile} />
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
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getEmployeeProfiles,
  getCurrentCompanyProfile,
})(EmployeeProfiles);
