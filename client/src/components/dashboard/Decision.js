import React, {Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Decision = ({
  auth: { user },
  profile: { loading, profile },
}) => {
  return (
    <Fragment>
      loading ? (<h1>Loading...</h1>) :{' '}
      {user.isCompany ? (
        <Fragment>
          profile?(
          <Redirect to='/employee-profiles' />
          ):(
          <Redirect to='/create-company-profile' />)
        </Fragment>
      ) : (
        <Fragment>
          profile?(
          <Redirect to='/company-profiles' />
          ):(
          <Redirect to='/create-employee-profile' />)
        </Fragment>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {setAlert, register})(Decision);
