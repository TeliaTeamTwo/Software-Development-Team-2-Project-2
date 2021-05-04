import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Chat from './Chat';
import {
  getCompanyProfiles,
  getCurrentEmployeeProfile,
} from '../../actions/profile';

const Chats = ({
  getCompanyProfiles,
  getCurrentEmployeeProfile,
  auth,
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
          {profiles.filter(
            (profile) =>
              profile.likedby.some((item) => item['user'] === auth.user._id) &&
              profile.likes.some((item) => item['user'] === auth.user._id)
          ).length > 0 ? (
            <Fragment>
              <p>Current Chats</p>
              {profiles
                .filter(
                  (profile) =>
                    profile.likedby.some(
                      (item) => item['user'] === auth.user._id
                    ) &&
                    profile.likes.some((item) => item['user'] === auth.user._id)
                )
                .map((profile) => (
                  <Chat
                    key={profile._id}
                    auth={auth}
                    profile={profile}
                    className='tinderCards__cardContainer'
                  />
                ))}
            </Fragment>
          ) : (
            <Fragment>
              <h4>No current chats</h4>
            </Fragment>
          )}
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
})(Chats);
