import React from 'react';

const Qualification = ({
  qual: { _id, school, degree, fieldofstudy, description },
}) => {
  return (
    <div>
      <h3>
        {degree}, {fieldofstudy}
      </h3>
      <p>{school}</p>
      <p>{description}</p>
    </div>
  );
};

export default Qualification;
