import React from 'react';
import Loader from "../Loader/Loader";
import './InfoCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import logo from "../../images/Spotify_Icon_RGB_Green.png";

const InfoCard = (props) => {
  const {artists, currentArtist, handleClick} = props;


  if (!currentArtist) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="info-card">
      <div className="current-artist">
        <div className="thumbnail">
          <img src={currentArtist.images.length ? currentArtist.images[0].url : logo} />
        </div>
        <div className="about">
          <h2>{currentArtist.name} 
            <a target="_blank" href={currentArtist.external_urls.spotify}>          
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </h2>
          
          <small className="stats">{currentArtist.followers.total} followers</small>
          <div className="tags">{currentArtist.genres.map((genre) =>  <small>{genre}</small>)}</div>
        </div>
      </div>
      <div className="related">
        {artists && artists.map((artist) => 
          <div className="artist" onClick={handleClick}>
            <div className="thumbnail">
              <img src={artist.images.length ? artist.images[0].url : logo} id={artist.id}/>
            </div>
            <small>{artist.name}</small>
          </div>
        )}
      </div>
    </div>
    );
}

 
export default InfoCard;