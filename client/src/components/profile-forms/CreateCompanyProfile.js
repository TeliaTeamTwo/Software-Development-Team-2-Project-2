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
      <h1>Create Your Profile</h1>
      <p>
        <i className='fas fa-user' /> Let's get some information about your
        Company
      </p>
      <small>* = required field</small>
      <form className="company-form" onSubmit={(e) => onSubmit(e)}>
        <div className="company-form-image">
          <div className="filebase-btn">
            <FileBase
              id='logo'
              type='file'
              multiple={false}
              onDone={({ base64 }) => setFormData({ ...formData, logo: base64 })}
            />
          </div>
        <small>*Your companmy's logo</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='*Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small>City & Country suggested (eg. Helsinki, Finland)</small>
        </div>

        <div>
          <textarea
            name='about'
            value={about}
            onChange={(e) => onChange(e)}
          />
          <small>Tell us a little about your Company</small>
        </div>

        <div>
          <i className='fab fa-website fa-2x' />
          <input
            type='text'
            placeholder='Website URL'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small>Company's website URL</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/company-dashboard'>Go Back</Link>
      </form>
      </section>
    </Fragment>
  );
};

export default connect(null, { createCompanyProfile })(
  withRouter(CreateCompanyProfile)
);
