import React, {Fragment, useEffect} from 'react'

import LikedPerson from './LIkedPerson'
import Spinner from './layout/Spinner'


const Lonely = ({
  auth,
  profiles,
  loading
}) => {
  return (
    <Fragment>
      {loading ? (
       <Spinner/>
      ) : (
        <Fragment>
          <p>People you liked...let's hope they like you</p>
          {profiles
            .filter((profile) =>
              profile.likedby.some(
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
      )}
    </Fragment>
  );
};



export default Lonely;


