import React from 'react'

const LIkedPerson = ({profile}) => {
    return (
      <div>
        <h3>{profile.user.name}</h3>
        <span className='pulse'>
          <img className='profile-img' src={profile.logo} alt='Your likes' />
        </span>
      </div>
    );
}

export default LIkedPerson
