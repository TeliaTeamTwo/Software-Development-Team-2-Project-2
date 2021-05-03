import React, { Fragment, useEffect } from 'react';
import Spinner from './layout/Spinner';
import LikedPerson from './LIkedPerson';
import Lonely from './Lonely';

const Match = ({
  auth,
  profile,
  profiles,
  loading
}) => {
    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {profiles.filter(
              (profile) =>
                profile.likedby.some(
                  (item) => item['user'] === auth.user._id
                ) &&
                profile.likes.some((item) => item['user'] === auth.user._id)
            ).length > 0 ? (
              <Fragment>
                <p>We found you a match</p>
                {profiles
                  .filter(
                    (profile) =>
                      profile.likedby.some(
                        (item) => item['user'] === auth.user._id
                      ) &&
                      profile.likes.some(
                        (item) => item['user'] === auth.user._id
                      )
                  )
                  .map((profile) => (
                    <LikedPerson
                      key={profile._id}
                      profile={profile}
                      className='tinderCards__cardContainer'
                    />
                  ))}
              </Fragment>
            ) : (
              <Fragment>
                <Lonely profiles={profiles} loading={loading} auth={auth} />
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
};


export default Match;
