import React from 'react';
import Loader from "../Loader/Loader";
import './InfoCard.scss';

const InfoCard = (props) => {
  const {artists, currentArtist} = props;

  return (
    <div class="info-card">
      {/* <h3>{currentArtist.name}</h3> */}
      {artists.map((artist) => 
        <div class="artist">
          <div class="thumbnail">
            <img src={artist.images[2].url}/>
          </div>
          <p>{artist.name}</p>
        </div>
      )}
    </div>
    );
}

 
export default InfoCard;