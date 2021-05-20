import React from 'react';
import './LikedPerson.scss';

const LIkedPerson = ({profile}) => {
    return (
      <div className="liked-person">
        <span className='pulse'>
          <img className='profile-img' src={profile.logo || profile.image} alt='Your likes' />
        </span>
        <h3>{profile.user.name}</h3>
      </div>
    );
}

export default LIkedPerson
