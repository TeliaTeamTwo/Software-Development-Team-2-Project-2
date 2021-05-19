import React, { Fragment} from 'react';
import Spinner from './layout/Spinner';
import LikedPerson from './LIkedPerson';
import Lonely from './Lonely';
import './Match.scss';

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
                <section className="match">
                <h2>Congratulations</h2>{' '}
                <p>You have earned yourself a Jargon Moment with...</p>
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
                  </section>
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
