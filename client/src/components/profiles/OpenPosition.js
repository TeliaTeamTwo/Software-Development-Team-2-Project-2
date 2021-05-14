import React from 'react';
import './OpenPosition.scss';

const OpenPosition = ({
    openPosition: {title, description, skills, minExperience, contractType}
}) => {
    return (
      <div className="position-container">
        <h3 className="position-title">
          {title}
        </h3>
        <p className="contract-type">{contractType}</p>
        <p className="min-experience">Minimun Experience: {minExperience} years</p>
        <p className="skills">Top Skills: {skills}</p>
        <p className="job-description">{description}</p>
      </div>
    );
}

export default OpenPosition
