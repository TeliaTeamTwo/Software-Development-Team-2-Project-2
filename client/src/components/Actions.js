import React from 'react';
import Rewind from './actions/Rewind';
import Dislike from './actions/Dislike';
import Like from './actions/Like';
import Superlike from './actions/Superlike';

const Actions = ({ personId, modifySuperficialChoices }) => (
  <div id='actions'>
    <Rewind userId={personId} />
    <Dislike
      userId={personId}/>
    <Like
      userId={personId}
    />
    <Superlike
      userId={personId}
    />
  </div>
);

export default Actions;
