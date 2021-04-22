import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Decision = ({
  auth: { user },
}) => {
    return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
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
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Decision);
