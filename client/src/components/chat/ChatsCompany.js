import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ChatCompany from './ChatCompany';
import {
  getEmployeeProfiles,
  getCurrentCompanyProfile,
} from '../../actions/profile';

const ChatsCompany = ({
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
          {profiles.filter(
            (profile) =>
              profile.likedby.some((item) => item['user'] === auth.user._id) &&
              profile.likes.some((item) => item['user'] === auth.user._id)
          ).length > 0 ? (
            <Fragment>
              <p className="current-chat">Current Chats</p>
              {profiles
                .filter(
                  (profile) =>
                    profile.likedby.some(
                      (item) => item['user'] === auth.user._id
                    ) &&
                    profile.likes.some((item) => item['user'] === auth.user._id)
                )
                .map((profile) => (
                  <ChatCompany
                    key={profile._id}
                    auth={auth}
                    profile={profile}
                    className='tinderCards__cardContainer'
                  />
                ))}
            </Fragment>
          ) : (
            <Fragment>
              <h4 className="current-chat">No current chats</h4>
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
  getEmployeeProfiles,
  getCurrentCompanyProfile,
})(ChatsCompany);
