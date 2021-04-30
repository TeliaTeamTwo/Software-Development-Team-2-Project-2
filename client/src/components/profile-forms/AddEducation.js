import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import './AddEducation.scss';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className="add-school">
      <h1>School Experience</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className="school-form-input">
          <label>School name*</label>
          <input
            className="form-input"
            type='text'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="school-form-input">
          <label>Degree*</label>
          <input
            className="form-input"
            type='text'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="school-form-input">
          <label>Programme*</label>
          <input
            className="form-input"
            type='text'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="school-form-input">
          <label>From*</label>
          <input
            className="form-input"
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="school-form-checkbox">
          <label>Do you study here currently?</label>
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
        <div className="school-form-input">
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
        <div className="school-form-input">
          <label>Programme description</label>
          <textarea
            name='description'
            cols='30'
            rows='5'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="required-field">
          <p>All required fields are marked with an *</p>
        </div>
        <input type='submit' className="submit-btn"/>
        <Link to='/employee-dashboard'>
        <button className="goback-btn">Go Back</button>
        </Link>
      </form>
      </section>
    </Fragment>
  );
};


export default connect(null, { addEducation })(AddEducation);
