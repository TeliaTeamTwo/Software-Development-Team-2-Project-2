import React, {Fragment, useEffect} from 'react'

import LikedPerson from './LIkedPerson'
import Spinner from './layout/Spinner'
import './Lonely.scss';


const Lonely = ({
  auth,
  profiles,
  loading
}) => {
  return (
    <Fragment>
      <section className="lonely">
      {loading ? (
       <Spinner/>
      ) : (
        <Fragment>
          <p>Profiles you have liked</p>
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
      </section>
    </Fragment>
  );
};



export default Lonely;


