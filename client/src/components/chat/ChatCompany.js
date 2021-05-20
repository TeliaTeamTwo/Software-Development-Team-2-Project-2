import React from 'react';
import './Chat.css';
import { Link } from 'react-router-dom';

const ChatCompany = ({ auth, profile }) => {
  const room = `${auth.user._id.toString()}-${profile.user._id.toString()}`;
  return (
    <Link to={`/chat?name=${auth.user.name}&room=${room}`}>
      <div className='chat'>
        <img
          className='chat__image'
          src={profile.logo || profile.image}
          alt='profile_pic'
        />
        <div className='chat__details'>
          <h2>{profile.user.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ChatCompany;
