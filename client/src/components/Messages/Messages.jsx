import React, { useEffect, useRef } from 'react';
import './Messages.css';
import { Message } from '../';

const Messages = ({ messages, name }) => {
  const chatLog = useRef(null);
  useEffect(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight;
    // eslint-disable-next-line
  }, [messages]);
  return (
    <div className='messages' ref={chatLog}>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
//
