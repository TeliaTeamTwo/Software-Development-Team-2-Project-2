import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteOpenPosition } from '../../actions/profile';

const OpenPosition = ({ openPositions, deleteOpenPosition }) => {
  const allOpenPositions = openPositions.map((pos) => (
    <tr key={pos._id}>
      <td>{pos.title}</td>
      <td>{pos.location}</td>
      <td>{pos.skills}</td>
      <td>{pos.contractType}</td>

      <td>
        <button
          onClick={() => deleteOpenPosition(pos._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Current Open Positions</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Skills</th>
            <th>Contract Type</th>
            <th />
          </tr>
        </thead>
        <tbody>{allOpenPositions}</tbody>
      </table>
    </Fragment>
  );
};

export default connect(null, { deleteOpenPosition })(OpenPosition);

