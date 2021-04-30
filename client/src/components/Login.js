import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import './Login.scss';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/decision' />;
  }
  return (
    <Fragment>
      <section className="login-page">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={(e) => onSubmit(e)}>
        <div className="login-input">
          <label>E-mail</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="login-input">
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <div className="login-btn">
        <input type='submit' value='Log In' />
        </div>
      </form>
      <div className="no-account">
        <p>
          Don't have an account?
        </p>
        <Link to='/register'><button>Sign Up</button></Link>
      </div>
    </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);