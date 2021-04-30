import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FileBase from 'react-file-base64';
import {
  createCompanyProfile,
  getCurrentCompanyProfile,
} from '../../actions/profile';

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
  }, [loading, getCurrentCompanyProfile]);

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
      <h1>Edit Your Profile</h1>

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
          <textarea name='about' value={about} onChange={(e) => onChange(e)} />
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
