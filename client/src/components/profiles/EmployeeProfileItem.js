import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeProfileItem = ({
  profile: {
    user: { _id, name },
    image,
    about,
    location,
    typeOfWork
  },
}) => {
  return (
    <div>
      <img src={image} alt='' />
      <div>
        <h2>{name}</h2>
        <h3>{typeOfWork}</h3>
        <h4>{about && <span>{about}</span>}</h4>
        <p className='my-1'>{location && <span>{location}</span>}</p>
      </div>
    </div>
  );
};

export default EmployeeProfileItem;

