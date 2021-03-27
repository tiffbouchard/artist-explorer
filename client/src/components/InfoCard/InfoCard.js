import React from 'react';
import Loader from "../Loader/Loader";
import './InfoCard.scss';
import { getArtist, getRelated } from "../../utils/spotifyService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'


const InfoCard = (props) => {
  const {artists, currentArtist, handleClick} = props;

  return (
    <div class="info-card">
      <div className="current-artist">
        <div className="thumbnail">
          <img src={currentArtist.images[0].url}/>
        </div>
        <div class="about">
          <h2>{currentArtist.name} 
            <a target="_blank" href={currentArtist.external_urls.spotify}>          
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </h2>
          
          <small class="stats">{currentArtist.followers.total} followers</small>
          <div class="tags">{currentArtist.genres.map((genre) =>  <small>{genre}</small>)}</div>
        </div>
      </div>
      <div class="related">
        {artists.map((artist) => 
          <div class="artist" onClick={handleClick}>
            <div class="thumbnail">
              <img src={artist.images[0].url} id={artist.id}/>
            </div>
            <small>{artist.name}</small>
          </div>
        )}
      </div>
    </div>
    );
}

 
export default InfoCard;