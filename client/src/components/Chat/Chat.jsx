import React, { useState, useEffect } from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import { InfoBar, Input, Messages } from './../';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [testRoom, settestRoom] = useState('');
  const [online, setOnline] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, testRoom } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    settestRoom(testRoom);
    // khi useEffect chạy , => emit lên join kèm data là obj name && testRoom
    socket.emit('join', { name, testRoom, online }, () => {});
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search, online]);
  useEffect(() => {
    socket.on('onliners', online => {
      setOnline(online);
    });
    socket.on('onliners2', online => {
      setOnline(online);
    });
    return () => {
      socket.off();
    };
  }, [online]);

  useEffect(() => {
    // client lắng nghe message , nhận về message là 1 obj ( user && text)
    // setState message
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
    return () => socket.off();
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      // client emit sendMessage
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar testRoom={testRoom} online={online} />
        <Messages name={name} messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
