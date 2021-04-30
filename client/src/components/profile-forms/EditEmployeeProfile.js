import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FileBase from 'react-file-base64';
import { createEmployeeProfile, getCurrentEmployeeProfile } from '../../actions/profile';

const EditEmployeeProfile = ({
  profile: { profile, loading },
  createEmployeeProfile,
  getCurrentEmployeeProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    status: '',
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

  useEffect(() => {
    getCurrentEmployeeProfile();

    setFormData({
      status: loading || !profile.status ? '' : profile.status,
      about: loading || !profile.about ? '' : profile.about,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      typeOfWork: loading || !profile.typeOfWork ? '' : profile.typeOfWork,
      image: loading || !profile.image ? '' : profile.image,
      location: loading || !profile.location ? '' : profile.location,
      website: loading || !profile.social ? '' : profile.social.website,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      github: loading || !profile.social ? '' : profile.social.github,
    });
  }, [loading]);


  const {
    status,
    about,
    skills,
    typeOfWork,
    location,
    website,
    github,
    linkedin,
    youtube,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createEmployeeProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1>Edit Your Profile</h1>
      <p>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            placeholder='Professionl Status'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div>
          <select
            type='text'
            name='typeOfWork'
            value={typeOfWork}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>Select from the options</option>
            <option value='Full Time'>Full Time</option>
            <option value='Part Time'>Part Time</option>
            <option value='Consultant'>Consultant</option>
            <option value='Freelance'>Freelance</option>
            <option value='Internship'>Internship</option>
            <option value='Other'>Other</option>
          </select>
          <small>What kind of work are you looking for?</small>
        </div>
        <div>
          <FileBase
            id='image'
            type='file'
            multiple={false}
            onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
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
        <Link to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  createEmployeeProfile,
  getCurrentEmployeeProfile,
})(withRouter(EditEmployeeProfile));
