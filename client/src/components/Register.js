import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import './Register.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    isCompany: ''
  });

  const { name, email, password, password2, isCompany } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password, isCompany });
    }
  };

   if (isAuthenticated) {
     return <Redirect to='/welcome' />;
   }
  return (
    <Fragment>
      <div className="register-page">
      <h1>Sign Up</h1>
      <form className="register-form" onSubmit={(e) => onSubmit(e)}>
        <div className="register-input">
          <label>Name/Company</label>
          <input
            className="form-input"
            type='text'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="register-input">
          <label>E-mail</label>
          <input
            className="form-input"
            type='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="register-input">
          <label>Password</label>
          <input
            className="form-input"
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="register-input">
          <label>Confirm password</label>
          <input
            className="form-input"
            type='password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
          <div className="register-input-radio">
          <label for='true'>
          Company Profile
          </label>
            <input
              className="radio-btn"
              type='radio'
              name='isCompany'
              value='true'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="register-input-radio">
          <label for='false'>
          Employee Profile
          </label>
            <input
              className="radio-btn"
              type='radio'
              name='isCompany'
              value='false'
              onChange={(e) => onChange(e)}
            />
          </div>
        <input className="register-btn" type='submit' value='Register' />
      </form>
      <div className="yes-account">
        <p>
          Already have an account? 
        </p>
        <Link to='/login'><button>Sign In</button></Link>
      </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
