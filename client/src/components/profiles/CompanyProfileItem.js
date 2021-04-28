import React from 'react';
import { Link } from 'react-router-dom';

const CompanyProfileItem = ({
  profile: {
    user: { _id, name },
    logo,
    about,
    location
  },
}) => {
  return (
    <div>
      <img src={logo} alt='' />
      <div>
        <h2>{name}</h2>
        <h4>{about && <span>{about}</span>}</h4>
        <p className='my-1'>{location && <span>{location}</span>}</p>
      </div>
    </div>
  );
};

export default CompanyProfileItem
