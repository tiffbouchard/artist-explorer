import React from 'react';
import Loader from "../Loader/Loader";
import './InfoCard.scss';

const InfoCard = (props) => {
  const {artists, currentArtist} = props;

  return (
    <div class="info-card">
      <div className="current-artist">
        <div className="thumbnail">
          <img src={currentArtist.images[2].url}/>
        </div>
        <div class="about">
          <h2>{currentArtist.name}</h2>
          <small class="stats">{currentArtist.followers.total} followers</small>
          <div class="tags">{currentArtist.genres.map((genre) =>  <small>{genre}</small>)}</div>
        </div>
      </div>
      <div class="related">
        {artists.map((artist) => 
          <div class="artist">
            <div class="thumbnail">
              <img src={artist.images[2].url}/>
            </div>
            <small>{artist.name}</small>
          </div>
        )}
      </div>
    </div>
    );
}

 
export default InfoCard;