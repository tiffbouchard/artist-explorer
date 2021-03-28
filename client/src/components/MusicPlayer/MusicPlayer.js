import React from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faFastForward, faFastBackward,  faHeart} from '@fortawesome/free-solid-svg-icons'


import './MusicPlayer.scss';

const MusicPlayer = () => {
  const { user } = React.useContext(UserContext);

  return (
    <div class="container">
      <div class="player">
        <div class="music-info">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Doja_Cat_-_Hot_Pink.png/220px-Doja_Cat_-_Hot_Pink.png"/>
          </div>
          <div class="trackinfo">
            <p>Say So</p>
            <p class="secondary-text">Doja Cat</p>
          </div>
        </div>
        <div class="controls">
          <FontAwesomeIcon icon={faFastBackward} />
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faFastForward} />
        </div>
        <div class="like">
          <FontAwesomeIcon icon={faHeart} />
        </div>

      </div>
    </div>
    );
}

export default MusicPlayer;