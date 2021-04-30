import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import './AddExperience.scss';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className="add-experience">
      <h1>Work Experience</h1>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className="experience-form-input">
          <label>Job title*</label>
          <input
            className="form-input"
            type='text'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="experience-form-input">
          <label>Company*</label>
          <input
            className="form-input"
            type='text'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="experience-form-input">
          <label>Location</label>
          <input
            className="form-input"
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="experience-form-input">
          <label>From*</label>
          <input
            className="form-input"
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="experience-form-checkbox">
          <label>Do you work here currently?</label>
            <input
              className="checkbox-btn"
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
        </div>
        <div className="experience-form-input">
          <label>To</label>
          <input
            className="form-input"
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className="experience-form-input">
          <label>Job description</label>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="required-field">
          <p>All required fields are marked with an *</p>
        </div>
        <input type='submit' className="submit-btn" />
        <Link to='/employee-dashboard'>
        <button className="goback-btn">Go Back</button>
        </Link>
      </form>
      </section>
    </Fragment>
  );
};


export default connect(null, { addExperience })(AddExperience);
