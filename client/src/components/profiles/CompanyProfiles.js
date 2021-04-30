import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CompanyProfileItem from './CompanyProfileItem';
import { getCompanyProfiles } from '../../actions/profile';

const CompanyProfiles = ({
  getCompanyProfiles,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getCompanyProfiles();
  }, [getCompanyProfiles]);
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
  profile: state.profile,
});

export default connect(mapStateToProps, {getCompanyProfiles})(CompanyProfiles)
