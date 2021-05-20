import React, {Fragment} from 'react';
import Qualification from './Qualification';
import TinderCard from 'react-tinder-card';
import { connect } from 'react-redux';
import Experience from './Experience';
import { addLikeByCompany, addLikeCompany, addDislikeCompany, addDislikeByCompany } from '../../actions/profile';
import './EmployeeProfileItem.scss';

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
  const onSwipe = (direction) => {
    if(direction==='left'){
      addDislikeCompany(_id);
      addDislikeByCompany(_id);
    }else if(direction==='right'){
      addLikeByCompany(_id);addLikeCompany(_id);
    }
  };
  return (
    <TinderCard
      className='profile-swipe'
      onSwipe={onSwipe}
      preventSwipe={['up', 'down']}
    >
      <div className='card'>
        <img src={image} alt='' className='profile-img' />
        <div className="profile-details">
        <div className="h2-container">
          <h2>{name}</h2>
          <h3 className='location'>Location: {location && <span>{location}</span>}</h3>
        </div>

          <h3 className="type-of-work">Interested in: {typeOfWork}</h3>
          <p>{about && <span>{about}</span>}</p>
          <h3 className="section-headings">Top Skills</h3>
            <div className="top-skills">
              {skills.map((skill, index) => (
                <div key={index} className='p-1'>
                  <i className='fas fa-check' /> {skill}
                </div>
              ))}
            </div>
          <div>
            {qualification.length > 0 ? (
              <Fragment>
                <h3 className="section-headings">Education</h3>
                <div className="info-container">
                  {qualification.map((qual) => (
                    <Qualification key={qual._id} qual={qual} />
                  ))}
                </div>
              </Fragment>
            ) : (
              <h3 className="section-headings">No Education Credentials</h3>
            )}
          </div>
          <div>
            {experience.length > 0 ? (
              <Fragment>
                <h3 className="section-headings">Experience</h3>
                <div className="info-container">
                  {experience.map((exp) => (
                    <Experience key={exp._id} exp={exp} />
                  ))}
                </div>
              </Fragment>
            ) : (
              <h3 className="section-headings">No Experience Credentials</h3>
            )}
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

