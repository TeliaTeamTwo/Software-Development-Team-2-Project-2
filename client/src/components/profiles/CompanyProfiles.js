import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CompanyProfileItem from './CompanyProfileItem';
import {
  getCompanyProfiles,
  getCurrentEmployeeProfile,
} from '../../actions/profile';

const CompanyProfiles = ({
  getCompanyProfiles,
  getCurrentEmployeeProfile,
  profile: { profile, profiles, loading },
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
            Companies around you
          </p>
          <div>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <CompanyProfileItem
                  key={profile._id}
                  profile={profile}
                  className='tinderCards__cardContainer'
                />
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
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCompanyProfiles,
  getCurrentEmployeeProfile,
})(CompanyProfiles);
