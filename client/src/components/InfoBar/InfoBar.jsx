import React from 'react';
import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
const InfoBar = ({ testRoom, online }) => {
  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <img src={onlineIcon} alt='online icon' className='onlineIcon' />
        <h3>
          {testRoom} {online} online
        </h3>
      </div>
      <div className='rightInnerContainer'>
        <a href='/'>
          <img src={closeIcon} alt='clone icon' />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
