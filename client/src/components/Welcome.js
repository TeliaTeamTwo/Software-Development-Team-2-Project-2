import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as JargonLogo } from '../jargon.svg';
import './Landing.scss';

const Welcome = () => {
  return (
    <div className='landing-page'>
      <JargonLogo />
      <h2>
        Hooray! Wecome to Jargon Moment family
      </h2>
      <h3>You can create your own profile and start browsing.</h3>
    </div>
  );
};

export default Welcome;
