import React, {Fragment} from 'react';
import Qualification from './Qualification';
import TinderCard from 'react-tinder-card';
import { connect } from 'react-redux';
import Experience from './Experience';
import { addLikeByCompany, addLikeCompany, addDislikeCompany, addDislikeByCompany } from '../../actions/profile';

const EmployeeProfileItem = ({
  addLikeCompany,
  addLikeByCompany,
  addDislikeCompany,
  addDislikeByCompany,
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
    <TinderCard className='profile swipe' preventSwipe={['up', 'down']}>
      <div className='card'>
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
              <h3>No Experience Credentials</h3>
            )}
          </div>
          <div>
            <button
              type='button'
              onClick={(e) => {
                addLikeByCompany(_id);
                addLikeCompany(_id);
              }}
            >
              <i class='fas fa-thumbs-up fa-2x' />{' '}
            </button>
            <button type='button'>
              <i
                class='fas fa-heart fa-2x'
                onClick={(e) => {
                  addLikeByCompany(_id);
                  addLikeCompany(_id);
                }}
              />{' '}
            </button>
            <button type='button' onClick={(e) => {addDislikeCompany(_id); addDislikeByCompany(_id);}}>
              <i class='fas fa-thumbs-down fa-2x' />
            </button>
          </div>
        </div>
      </div>
    </TinderCard>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLikeByCompany,
  addLikeCompany,
  addDislikeCompany,
  addDislikeByCompany,
})(EmployeeProfileItem);

