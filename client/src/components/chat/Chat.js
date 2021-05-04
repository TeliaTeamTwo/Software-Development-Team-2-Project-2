import React from 'react';
import './Chat.css';
import { Link } from 'react-router-dom';

const Chat = ({
    auth,
  profile: {
    user: { _id, name },
    logo,
  },
}) => {
  return (
    <Link to={`/chat?name=${auth.user.name}&room=${_id}-${auth.user._id}`}>
      <div className='chat'>
        <img className='chat__image' src={logo} />
        <div className='chat__details'>
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
