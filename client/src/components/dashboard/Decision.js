import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Decision = ({
  auth: { user },
  profile: { profile, loading },
}) => {
    return loading && profile === null ? (
      <Fragment>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        <Fragment>
          <p>What kind of profile you want to create?</p>
          <Link to='/create-employee-profile' className='btn btn-primary my-1'>
            Employee Profile
          </Link>
          <Link to='/create-company-profile' className='btn btn-primary my-1'>
            Company Profile
          </Link>
        </Fragment>
      </Fragment>
    ) : (
        <Redirect to='/company-dashboard' />
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Decision);
