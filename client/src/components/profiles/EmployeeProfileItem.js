import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Qualification from './Qualification';
import Experience from './Experience';

const EmployeeProfileItem = ({
  profile: {
    user: { _id, name },
    image,
    skills,
    about,
    location,
    typeOfWork,
    qualification,
    experience
  },
}) => {
  return (
    <div className='profile'>
      <img src={image} alt='' className='round-img profile-img' />
      <div>
        <h2>
          {name}, {location && <span>{location}</span>}
        </h2>
        <h3>{typeOfWork}</h3>
        <p>{about && <span>{about}</span>}</p>
        <h3>Top Skills</h3>
        <div>
          {skills.map((skill, index) => (
            <div key={index} className='p-1'>
              <i className='fas fa-check' /> {skill}
            </div>
          ))}
        </div>
        <div>
          {qualification.length > 0 ? (
            <Fragment>
              <h3>Qualification</h3>
              {qualification.map((qual) => (
                <Qualification key={qual._id} qual={qual} />
              ))}
            </Fragment>
          ) : (
            <h3>No Education Credentials</h3>
          )}
        </div>
        <div>
          {experience.length > 0 ? (
            <Fragment>
              <h3>Experience</h3>
              {experience.map((exp) => (
                <Experience key={exp._id} exp={exp} />
              ))}
            </Fragment>
          ) : (
            <h3>No Education Credentials</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileItem;

