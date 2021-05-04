import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FileBase from 'react-file-base64';
import { createCompanyProfile } from '../../actions/profile';
import './CreateCompanyProfile.scss';

const CreateCompanyProfile = ({ createCompanyProfile, history }) => {
  const [formData, setFormData] = useState({
    about: '',
    logo: '',
    location: '',
    website: '',
  });
  const {
    about,
    location,
    website,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCompanyProfile(formData, history);
  };

  return (
    <Fragment>
      <section className="create-company-profile-page">
        <h1>Create Profile</h1>
        {/* <p>
          <i className='fas fa-user' /> Let's get some information about your
          Company
        </p>
        <small>* = required field</small> */}
        <form className="company-form" onSubmit={(e) => onSubmit(e)}>
          <label>Company logo</label>
          <div className="company-form-image">
            <div className="company-form-image">
              <div className="filebase-btn">
                <FileBase
                  id='logo'
                  type='file'
                  multiple={false}
                  onDone={({ base64 }) => setFormData({ ...formData, logo: base64 })}
                />
              </div>
            </div>
          </div>

          <div className="company-form-input">
            <label>Company name*</label>
            <div>
              <input
                type='text'
                name='location'
                value={location}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="company-form-input">
            <label>Location*</label>
            <div>
              <input
                type='text'
                name='location'
                value={location}
                onChange={(e) => onChange(e)}
              />
              {/* <label>City & Country suggested (eg. Helsinki, Finland)</label> */}
            </div>
          </div>

          <div className="company-form-input">
            <label>Description</label>
            <div>
              <textarea
                name='about'
                value={about}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="company-form-input">
            <label>Company website</label>
            <div>
              {/* <i className='fab fa-website fa-2x' /> */}
              <input
                type='text'
                name='website'
                value={website}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="required-field">
            <p>All required fields are marked with *</p>
          </div>

          <input className="submit-btn" type='submit' />
          <Link to='/company-dashboard'><button className="goback-btn">Go Back</button>
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

export default connect(null, { createCompanyProfile })(
  withRouter(CreateCompanyProfile)
);
