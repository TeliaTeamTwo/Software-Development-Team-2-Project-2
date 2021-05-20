import React, {Fragment, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, loadUser } from '../../actions/auth';

const Decision = ({
  auth: { user },
  profile: { loading, profile },
}

) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Fragment>
      {loading && (<h1>Loading...</h1>) };
      {
        <Fragment>
          <Redirect to='/welcome' />
        </Fragment>
   }
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { setAlert, register, loadUser})(
  Decision
);
