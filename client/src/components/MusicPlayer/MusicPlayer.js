import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faFastForward, faFastBackward,  faHeart} from '@fortawesome/free-solid-svg-icons'


import './MusicPlayer.scss';

const MusicPlayer = (props) => {
  const { nowPlaying } = props;


  return (
    <div className="container">
      {nowPlaying && 
        <div className="player">
          <div className="music-info">
            <div>
              <img src={nowPlaying[0]}/>
            </div>
          </div>
          <div className="trackinfo">
            <div>
              <p>{nowPlaying[1]}</p>
              <small className="secondary-text">{nowPlaying[2]}</small>
            </div>
          </div>
          {/* <div className="controls">
            <FontAwesomeIcon icon={faFastBackward} />
            <FontAwesomeIcon icon={faPlay} />
            <FontAwesomeIcon icon={faFastForward} />
          </div>
          <div className="like">
            <FontAwesomeIcon icon={faHeart} />
          </div> */}

        </div>
      }
    </div>
    );
}

export default MusicPlayer;