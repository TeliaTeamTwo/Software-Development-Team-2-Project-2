import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FileBase from 'react-file-base64';
import {
  createCompanyProfile,
  getCurrentCompanyProfile,
} from '../../actions/profile';
import './EditCompanyProfile.scss';

const EditCompanyProfile = ({
  profile: { profile, loading },
  createCompanyProfile,
  getCurrentCompanyProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    about: '',
    logo: '',
    location: '',
    website: '',
  });
  

  useEffect(() => {
    getCurrentCompanyProfile();

    setFormData({
      about: loading || !profile.about ? '' : profile.about,
      logo: loading || !profile.logo ? '' : profile.logo,
      location: loading || !profile.location ? '' : profile.location,
      website: loading || !profile.website ? '' : profile.website,
    });
  }, [getCurrentCompanyProfile, loading]);

  const {
    about,
    location,
    website,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCompanyProfile(formData, history, true);
  };

  return (
    <Fragment>
      <section className="edit-company-profile-page">
      <h1>Edit Profile</h1>

      <form className="company-form" onSubmit={(e) => onSubmit(e)}>
        <label>Company logo*</label>
        <div className="company-form-image">
          <div className="filebase-btn">
            <div>
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
          <label>Location*</label>
          <input
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="company-form-input">
          <label>Description</label>
          <div>
            <textarea name='about' value={about} onChange={(e) => onChange(e)} />
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

        <input type='submit' className='submit-btn' />
        <Link to='/company-dashboard'>
          <button className="goback-btn">Go Back</button>
        </Link>
      </form>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  createCompanyProfile,
  getCurrentCompanyProfile,
})(withRouter(EditCompanyProfile));
