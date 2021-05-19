import React, {Fragment} from 'react';
import TinderCard from 'react-tinder-card';
import OpenPosition from './OpenPosition';
import { connect } from 'react-redux';
import {
  addLikeBy,
  addDislikeBy,
  addLike,
  addDislike,
} from '../../actions/profile';
import './CompanyProfileItem.scss';


const CompanyProfileItem = ({
  addLikeBy,
  addLike,
  addDislike,
  addDislikeBy,
  profile: {
    user: { _id, name },
    logo,
    about,
    location,
    openPositions,
  },
}) => {
  const onSwipe = (direction) => {
    if (direction === 'left') {
      addDislike(_id);
      addDislikeBy(_id);
    } else if (direction === 'right') {
      addLikeBy(_id);
      addLike(_id);
    }
  };
  return (
    <Fragment>
      <TinderCard
        className='profile swipe'
        onSwipe={onSwipe}
        preventSwipe={['up', 'down']}
      >
        <div className='card'>
          <img src={logo} alt='' className='profile-img' />
          <div className="profile-details">
            <div className="h2-container">
              <h2>{name}</h2>
              <h3 className='location'>Location: {location && <span>{location}</span>}</h3>
            </div>

            {openPositions.length > 0 ? (
              <Fragment>
                <div className="open-positions">
                  <h3 className="heading">Open Position</h3>
                  {openPositions.map((openPosition) => (
                    <OpenPosition
                      key={openPosition._id}
                      openPosition={openPosition}
                    />
                  ))}
                <h3 className="heading">About the company</h3>
                <p>{about && <span>{about}</span>}</p>
                </div>
              </Fragment>
            ) : (
              <h3 className="open-positions">No Open Positions</h3>
            )}
          </div>
        </div>
      </TinderCard>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLikeBy,
  addLike,
  addDislike,
  addDislikeBy,
})(CompanyProfileItem);
