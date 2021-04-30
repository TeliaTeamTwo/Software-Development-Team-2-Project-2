import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Footer = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const companyLinks = (
    <ul>
      <li>
        <Link to='/employee-profiles'>Employee-Profiles</Link>
      </li>
      <li>
        <Link to='/company-dashboard'>Company dashboard</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const employeeLinks = (
    <ul>
      <li>
        <Link to='/company-profiles'>Company Profiles</Link>
      </li>
      <li>
        <Link to='/employee-dashboard'>Employee-dashboard</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <footer className="footer">
      {!loading && (
        <Fragment>{isAuthenticated ? (
          user.isCompany?(companyLinks):(employeeLinks)
        ) : guestLinks}</Fragment>
      )}
    </footer>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Footer);
