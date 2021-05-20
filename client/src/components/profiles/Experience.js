import React from 'react';

const Experience = ({
  exp: { location, title, company, description },
}) => {
  return (
    <div>
      <h3>
        {title},  {location}
      </h3>
      <p>{company}</p>
      <p>{description}</p>
    </div>
  );
};

export default Experience;
