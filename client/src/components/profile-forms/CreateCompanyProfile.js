import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FileBase from 'react-file-base64';
import { createCompanyProfile } from '../../actions/profile';

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
    console.log(formData)
    createCompanyProfile(formData, history);
  };

  return (
    <Fragment>
      <h1>Create Your Profile</h1>
      <p>
        <i className='fas fa-user' /> Let's get some information about your
        Company
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <FileBase
            id='logo'
            type='file'
            multiple={false}
            onDone={({ base64 }) => setFormData({ ...formData, logo: base64 })}
          />
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
        <Link to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { createCompanyProfile })(
  withRouter(CreateCompanyProfile)
);
