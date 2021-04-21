import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEmployeeProfile } from '../../actions/profile';

const CreateEmployeeProfile = ({ createEmployeeProfile, history }) => {
  const [formData, setFormData] = useState({
    status:'',
    about: '',
    skills: '',
    typeOfWork: '',
    image: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    youtube: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    status,
    about,
    skills,
    typeOfWork,
    image,
    location,
    website,
    github,
    linkedin,
    youtube,
  } = formData;


  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createEmployeeProfile(formData, history);
  };

  return (
    <Fragment>
      <h1>Create Your Profile</h1>
      <p>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Type of work'
            name='typeOfWork'
            value={typeOfWork}
            onChange={(e) => onChange(e)}
          />
          <small>What kind of work are you looking for?</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='image'
            name='image'
            value={image}
            onChange={(e) => onChange(e)}
          />
          <small>Your image</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small>City & state suggested (eg. Helsinki, Finland)</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div>
          <textarea
            placeholder='A short bio of yourself'
            name='about'
            value={about}
            onChange={(e) => onChange(e)}
          />
          <small>Tell us a little about yourself</small>
        </div>
        <div>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-github fa-2x' />
              <input
                type='text'
                placeholder='Github URL'
                name='github'
                value={github}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Website URL'
                name='website'
                value={website}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { createEmployeeProfile })(
  withRouter(CreateEmployeeProfile)
);