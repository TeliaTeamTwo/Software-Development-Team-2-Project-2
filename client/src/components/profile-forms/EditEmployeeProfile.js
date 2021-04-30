import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FileBase from 'react-file-base64';
import { createEmployeeProfile, getCurrentEmployeeProfile } from '../../actions/profile';
import './EditEmployeeProfile.scss'

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
    image,
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
    createEmployeeProfile(formData, history);
  };

  return (
    <Fragment>
      <section className="edit-employee-profile-page">
      <h1>Edit Profile</h1>
      <form className="employee-form" onSubmit={(e) => onSubmit(e)}>
        <label>Image</label>
        <div className="employee-form-image">
          <div className="filebase-btn">
          <FileBase
            id='image'
            type='file'
            multiple={false}
            onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
          />
        </div>
        </div>
        <div className="employee-form-input">
          <label>Professional status*</label>
          <input
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="employee-form-input">
          <label>What type of work are you looking for?</label>
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
        </div>    
        <div className="employee-form-input">
          <label>Your location*</label>
          <input
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="employee-form-input">
          <label>Top skills*</label>
          <input
            type='text'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="employee-form-input">
          <label>Describe yourself</label>
          <textarea
            placeholder='A short bio of yourself'
            name='about'
            value={about}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="required-field">
          <p>All required fields are marked with an *</p>
        </div>
        <div className="employee-form-input">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Links
          </button>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-github fa-2x' />
              <input
                type='text'
                name='github'
                value={github}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                name='website'
                value={website}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard'><button className="goback-btn">Go Back</button></Link>
      </form>
      </section>
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
