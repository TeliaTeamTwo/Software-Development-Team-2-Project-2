import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addOpenPosition } from '../../actions/profile';

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
      <h1>Add An Open Position</h1>

      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault();
          addOpenPosition(formData, history);
        }}
      >
        <div>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
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
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Experience needed'
            name='minExperience'
            value={minExperience}
            onChange={(e) => onChange(e)}
          />
          <small>Please use numbers (eg. 0 or 3 or 10)</small>
        </div>

        <div>
          <textarea
            name='description'
            cols='20'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <select
            type='text'
            name='contractType'
            value={contractType}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select from the options</option>
            <option value='Full Time'>Full Time</option>
            <option value='Part Time'>Part Time</option>
            <option value='Consultant'>Consultant</option>
            <option value='Freelance'>Freelance</option>
            <option value='Internship'>Internship</option>
            <option value='Other'>Other</option>
          </select>
          <small>What kind of contract?</small>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link to='/company-dashboard'>Go Back</Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { addOpenPosition })(AddOpenPosition);
