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
import Lonely from '../Lonely';

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
  return (
    <Fragment>
      <TinderCard className='profile swipe' preventSwipe={['up', 'down']}>
        <div className='card'>
          <img src={logo} alt='' className='profile-img' />
          <div>
            <h2>{name}</h2>
            <h3 className='my-1'>{location && <span>{location}</span>}</h3>
            <p>{about && <span>{about}</span>}</p>
            {openPositions.length > 0 ? (
              <Fragment>
                <h3>Open Positions</h3>
                {openPositions.map((openPosition) => (
                  <OpenPosition
                    key={openPosition._id}
                    openPosition={openPosition}
                  />
                ))}
              </Fragment>
            ) : (
              <h4>No Open Positions</h4>
            )}
          </div>
          <div>
            <button
              type='button'
              onClick={(e) => {
                addLikeBy(_id);
                addLike(_id);
              }}
            >
              <i class='fas fa-thumbs-up fa-2x' />{' '}
            </button>
            <button type='button'>
              <i
                class='fas fa-heart fa-2x'
                onClick={(e) => {
                  addLikeBy(_id);
                  addLike(_id);
                }}
              />{' '}
            </button>
            <button type='button' onClick={(e) => {addDislike(_id); addDislikeBy(_id)}}>
              <i class='fas fa-thumbs-down fa-2x' />
            </button>
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
