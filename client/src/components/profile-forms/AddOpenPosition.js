import React, { Fragment, useState } from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { addOpenPosition } from '../../actions/profile';
import './AddOpenPosition.scss';

const AddOpenPosition = ({ addOpenPosition, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    skills: '',
    contractType: '',
    minExperience: '',
  });

  const {
    title,
    location,
    description,
    skills,
    contractType,
    minExperience,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className="add-position">
      <h1>Add Position</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addOpenPosition(formData, history);
        }}
      >
      <div className="position-form-input">
        <label>Job title*</label>
        <div>
          <input
            className='form-input'
            type='text'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>

      <div className="position-form-input">
        <label>Skills*</label>
        <div>
          <input
            className='form-input'
            type='text'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>

      <div className="position-form-input">
        <label>Location</label>
        <div>
          <input
            className='form-input'
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>

      <div className="position-form-input">
        <label>Years of experience</label>
        <div>
          <input
            className='form-input'
            type='number'
            name='minExperience'
            value={minExperience}
            onChange={(e) => onChange(e)}
          />
          {/* <small>Please use numbers (eg. 0 or 3 or 10)</small> */}
        </div>
      </div>

      <div className="position-form-input">
        <label>Job description</label>
        <div>
          <textarea
            name='description'
            cols='20'
            rows='5'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>

      <div className="position-form-input">
        <label>Contract type</label>
        <div>
          <select
            className='form-input'
            type='text'
            name='contractType'
            value={contractType}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select from options</option>
            <option value='Full Time'>Full Time</option>
            <option value='Part Time'>Part Time</option>
            <option value='Consultant'>Consultant</option>
            <option value='Freelance'>Freelance</option>
            <option value='Internship'>Internship</option>
            <option value='Other'>Other</option>
          </select>
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

export default connect(null, { addOpenPosition })(AddOpenPosition);
