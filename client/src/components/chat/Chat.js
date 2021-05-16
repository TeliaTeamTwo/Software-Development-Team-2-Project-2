import React from 'react';
import './Chat.scss';
import { Link } from 'react-router-dom';

const Chat = ({
    auth,
  profile
}) => {

  const room = `${profile.user._id.toString()}-${auth.user._id.toString()}`;
  return (
    <Link to={`/chat?name=${auth.user.name}&room=${room}`}>
      <div className='chat'>
        <img className='chat__image' src={profile.logo || profile.image} />
        <div className='chat__details'>
          <h2>{profile.user.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
