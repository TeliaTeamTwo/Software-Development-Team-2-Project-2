import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Decision = ({
  auth: { user },
  profile: { loading },
}) => {
 

  return loading && user.isCompany ? (
    <Redirect to='/employee-profiles' />
  ) : (
    <Redirect to='/company-profiles' />
  ); 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {setAlert, register})(Decision);
