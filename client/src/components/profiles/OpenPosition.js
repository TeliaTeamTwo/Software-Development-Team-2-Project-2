import React from 'react';
import './OpenPosition.scss';

const OpenPosition = ({
    openPosition: {title, location, description, minExperience, contractType}
}) => {
    return (
      <div className="position-container">
        <h3 className="position-title">
          {title}
          {/* , {location} */}
        </h3>
        <p className="contract-type">{contractType}</p>
        <p className="min-experience">Minimun Experience: {minExperience} years</p>
        <p className="job-description">{description}</p>
      </div>
    );
}

export default OpenPosition
