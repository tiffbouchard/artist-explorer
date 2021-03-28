import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faFastForward, faFastBackward,  faHeart} from '@fortawesome/free-solid-svg-icons'


import './MusicPlayer.scss';

const MusicPlayer = () => {

  return (
    <div className="container">
      <div className="player">
        <div className="music-info">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Doja_Cat_-_Hot_Pink.png/220px-Doja_Cat_-_Hot_Pink.png"/>
          </div>
          <div className="trackinfo">
            <p>Say So</p>
            <p className="secondary-text">Doja Cat</p>
          </div>
        </div>
        <div className="controls">
          <FontAwesomeIcon icon={faFastBackward} />
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faFastForward} />
        </div>
        <div className="like">
          <FontAwesomeIcon icon={faHeart} />
        </div>

      </div>
    </div>
    );
}

export default MusicPlayer;