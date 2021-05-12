import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Decision = ({
  auth: { user },
  profile: { loading },
}) => {
  return loading?(
    <h1>Loading...</h1>
  ):(user.isCompany ? (
    <Redirect to='/company-profiles' />
  ) : (
    <Redirect to='/employee-profiles' />
  )
  ) 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {setAlert, register})(Decision);
