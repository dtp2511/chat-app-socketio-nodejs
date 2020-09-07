import React, { useState } from 'react';
import './Join.css';
import { Link } from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState('');
  const [testRoom, settestRoom] = useState('');

  return (
    <>
      <div className='joinOuterContainer'>
        <div className='joinInnerContainer'>
          <h1 className='heading'>
            <div>
              <input
                placeholder='Name'
                type='text'
                className='joinInput'
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder='testRoom'
                type='text'
                className='joinInput mt-20'
                onChange={e => settestRoom(e.target.value)}
              />
            </div>
            <Link
              onClick={e => (!name || !testRoom ? e.preventDefault() : null)}
              to={`/chat?name=${name}&testRoom=${testRoom}`}
            >
              <button className='button mt-20' type='submit'>
                Sign IN
              </button>
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Join;
