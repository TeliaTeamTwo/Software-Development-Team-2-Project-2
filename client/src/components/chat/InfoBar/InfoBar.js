import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ users }) => (
  <div className='infoBar'>
    {users ? (
      <div>
          <h3>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name} 
                <img alt='Online Icon' src={onlineIcon} />
              </div>
            ))}
          </h3>
      </div>
    ) : null}
    <div className='rightInnerContainer'>
      <a href='/'>
        <img src={closeIcon} alt='close icon' />
      </a>
    </div>
  </div>
);

export default InfoBar;