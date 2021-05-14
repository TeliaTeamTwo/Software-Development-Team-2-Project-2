import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as JargonLogo } from '../jargon.svg';
import './Landing.scss';

const Welcome = () => {
  return (
    <div className='landing-page'>
      <JargonLogo />
      <h2>
        Welcome to Jargon Moment! We connect companies with IT rock stars and
        unicorns.
      </h2>
      <h3>You are logged in</h3>
    </div>
  );
};

export default Welcome;
