import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import OpenPosition from './OpenPosition';

const CompanyProfileItem = ({
  profile: {
    user: { _id, name },
    logo,
    about,
    location,
    openPositions
  },
}) => {
  return (
    <div className='profile'>
      <img src={logo} alt='' className='round-img profile-img' />
      <div>
        <h2>{name}</h2>
        <h3 className='my-1'>{location && <span>{location}</span>}</h3>
        <p>{about && <span>{about}</span>}</p>
        {openPositions.length > 0 ? (
          <Fragment>
            <h3>Open Positions</h3>
            {openPositions.map((openPosition) => (
              <OpenPosition
                key={openPosition._id}
                openPosition={openPosition}
              />
            ))}
          </Fragment>
        ) : (
          <h3>No Open Positions</h3>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileItem
