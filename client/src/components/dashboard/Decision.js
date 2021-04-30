import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Decision = ({
  auth: { user, isAuthenticated },
  profile: { profile, loading },
}) => {
 

  return loading && profile === null ? (
    user.isCompany ? (
      <Redirect to='/create-company-profile' />
    ) : (
      <Redirect to='/create-employee-profile' />
    )
  ) : user.isCompany ? (
    <Redirect to='/company-dashboard' />
  ) : (
    <Redirect to='/employee-dashboard' />
  ); 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {setAlert, register})(Decision);
