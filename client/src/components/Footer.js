import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import {ReactComponent as JargonIcon} from '../logo-icon.svg';
import './Footer.scss';

const Footer = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const companyLinks = (
    <ul>
      <li>
        <Link to='/employee-profiles'><JargonIcon /></Link>
      </li>
      <li>
        <Link to='/chats'><i class="fas fa-comment-dots"></i></Link>
      </li>
      <li>
        <Link to='/company-dashboard'><i class="fas fa-user-circle"></i></Link>
      </li>
    </ul>
  );
  const employeeLinks = (
    <ul>
      <li>
        <Link to='/company-profiles'><JargonIcon /></Link>
      </li>
      <li>
        <Link to='/chats'><i class="fas fa-comment-dots"></i></Link>
      </li>
      <li>
        <Link to='/employee-dashboard'><i class="fas fa-user-circle"></i></Link>
      </li>
    </ul>
  );

  const nothing = (
    <div></div>
  );

  return (
    <footer className="footer">
      {!loading && (
        <Fragment>{isAuthenticated ? (
          user.isCompany?(companyLinks):(employeeLinks)
        ) : nothing}
        </Fragment>
      )}
    </footer>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Footer);
