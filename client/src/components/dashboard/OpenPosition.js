import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteOpenPosition } from '../../actions/profile';
import './OpenPosition.scss';

const OpenPosition = ({ openPositions, deleteOpenPosition }) => {
  const allOpenPositions = openPositions.map((pos) => (
    <tr key={pos._id}>
      <td>{pos.title}</td>
      <td>{pos.location}</td>
      {/* <td className="skills">{pos.skills.join(', ')}</td> */}
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
      <div className="open-positions">
      <label>Open Positions</label>
      <table>
        {/* <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Skills</th>
            <th>Contract Type</th>
            <th />
          </tr>
        </thead> */}
        <tbody>{allOpenPositions}</tbody>
      </table>
      </div>
    </Fragment>
  );
};

export default connect(null, { deleteOpenPosition })(OpenPosition);

