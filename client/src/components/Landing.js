import React from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as JargonLogo} from '../jargon.svg';
import './Landing.scss';

const Landing = () => {
  return (
    <section className="landing-page">
          <JargonLogo />
          <h2>Welcome to Jargon Moment!
          We connect companies with
          IT rock stars and unicorns.
          </h2>
          <div className="landing-btn">
            <Link to='/login' >
              <button>Log in</button>
            </Link>
            <Link to='/register'>
              <button>Sign up</button>
            </Link>
          </div>
    </section>
  );
};

export default Landing;
