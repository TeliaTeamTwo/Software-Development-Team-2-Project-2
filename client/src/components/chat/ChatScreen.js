import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import io from 'socket.io-client';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';

import './ChatScreen.scss';

const ENDPOINT = 'https://jm-chat-server.herokuapp.com/';

let socket;

const ChatScreen = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    axios.get(`${ENDPOINT}chats/room/${room}`).then((res) => {
      const result = res.data.chat;
      {result && setMessages(result)};
    }
    );
    
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar users={users} />
        {messages && <Messages messages={messages} name={name} />}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatScreen
