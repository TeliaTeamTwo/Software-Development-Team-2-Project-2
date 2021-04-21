import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section>
          <h1>Jargon Moment</h1>
          <div>
            <Link to='/login' >
              Login
            </Link>
            <Link to='/register'>
              Sign Up
            </Link>
          </div>
    </section>
  );
};

export default Landing;
