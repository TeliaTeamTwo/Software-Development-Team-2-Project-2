import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EmployeeProfileItem from './EmployeeProfileItem';
import {
  getEmployeeProfiles,
  getCurrentCompanyProfile,
} from '../../actions/profile';

const EmployeeProfiles = ({
  getEmployeeProfiles,
  getCurrentCompanyProfile,
  profile: { profiles, loading },
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
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <EmployeeProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getEmployeeProfiles,
  getCurrentCompanyProfile,
})(EmployeeProfiles);
