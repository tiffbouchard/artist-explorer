import React from 'react';
import Loader from "../Loader/Loader";
import './InfoCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import logo from "../../images/Spotify_Icon_RGB_Green.png";

const InfoCard = (props) => {
  const {handleClick, artistDetails} = props;
  const [play, setPlay] = React.useState(false);  


  const playMusic = (event) => {
    event.stopPropagation();
    setPlay(event.target.id);
    // audio.play();
  }


  const stopMusic = (event) => {
    event.stopPropagation();
    setPlay(null)
  }

  if (!artistDetails) {
    return (
      <Loader/>
    ) 
  }

  return (
    <div className="info-card">
      <div className="current-artist">
        <div className="thumbnail">
          <img src={artistDetails.artist.images.length ? artistDetails.artist.images[0].url : logo} />
        </div>
        <div className="about">
          <h2>{artistDetails.artist.name} 
            <a target="_blank" className="external-tag" href={artistDetails.artist.external_urls.spotify}>          
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </h2>
          
          <small className="stats">{artistDetails.artist.followers.total} followers</small>
          <div className="tags">{artistDetails.artist.genres.map((genre) =>  <small>{genre}</small>)}</div>
        </div>
      </div>
      <div className="related-tracks">
          <h2>Top Tracks</h2>
          <div className="related m-0">
            {artistDetails.topTracks && artistDetails.topTracks.tracks && artistDetails.topTracks.tracks.map((track) => 
              <div>
                {track.is_playable && play === track.id &&
                  <audio id={track.id} autoPlay>
                    <source src={track.preview_url} type=""/>
                  </audio>
                }
                {track.is_playable && 
                <div className="album-thumbnail">
                  <img src={track.album.images[0].url} onMouseEnter={playMusic} onMouseLeave={stopMusic} id={track.id}/>
                </div>
                }
              </div>
            )}
          </div>

      <h2>Related Artists</h2>
      <div className="related">

        {artistDetails.related && artistDetails.related.artists && artistDetails.related.artists.map((artist) => 
          <div className="artist" onClick={handleClick}>
            <div className="thumbnail">
              <img src={artist.images.length ? artist.images[0].url : logo} id={artist.id}/>
            </div>
            <small>{artist.name}</small>
          </div>
        )}
      </div>
        </div>
    </div>
    );
}

 
export default InfoCard;