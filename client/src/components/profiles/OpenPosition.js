import React from 'react'

const OpenPosition = ({
    openPosition: {title, location, description, minExperience, contractType}
}) => {
    return (
      <div>
        <h3>
          {title}, {location}
        </h3>
        <p>{contractType}</p>
        <p>Minimun Experience - {minExperience} years</p>
        <p>{description}</p>
      </div>
    );
}

export default OpenPosition
