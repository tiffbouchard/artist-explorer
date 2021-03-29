import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getTopArtistsShort, getArtist, getRelated, getRecommendationsForArtist, getAllArtistInfo, getUser} from "../../utils/spotifyService";
import InfoCard from "../../components/InfoCard/InfoCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'


import "./Random.scss";

const Random = () => {
  const [artists, setArtists] = React.useState(null);  
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  
  const [randomArtist, setRandomArtist] = React.useState(null);  
  const [loading, setLoading] = React.useState(false);  
  const [play, setPlay] = React.useState(false);  
  const [artistDetails, setArtistDetails] = React.useState(null);  


  const audioEl = React.useRef(null);
  

  const getSeeds = async () => {
    const artistsList = await getTopArtistsShort();
    const max = artistsList.data.items.length;
    const min = 0;
    var i = 0;
    var randomIdx;
    var randArtistList = [];

    while (i < 4) {
      randomIdx = Math.floor(Math.random() * (max - min + 1)) + min;
      if (artistsList.data.items[randomIdx]) {
        randArtistList.push(artistsList.data.items[randomIdx].id)
      } else {
        continue
      }
      i++;
    }

    return randArtistList;
  }

  const getRandomArtist = async () => {
    setLoading(true);
    const seeds = await getSeeds();
    const randomArtist = await getRecommendationsForArtist(seeds);
    const user = await getUser();
    const artistDetails = await getAllArtistInfo(randomArtist.data.tracks[0].artists[0].id, user.data.country)
    setRandomArtist(artistDetails);
    setLoading(false);
  }
  

  const getSingleArtist = async (artistId) => {
    const singleArtist = await getArtist(artistId);
    setSingleArtist(singleArtist.data)
  }

  const getRelatedArtists = async (artistId) => {
    const relatedArtists = await getRelated(artistId);
    setRelatedArtists(relatedArtists.data.artists);
  }
  
  const getArtistDetails = async (artistId) => {
    const user = await getUser();
    const artistDetails = await getAllArtistInfo(artistId, user.data.country);
    setArtistDetails(artistDetails);

  }
  
  const handleClick = (event) => {
    event.stopPropagation();
    console.log(event.target)
    getRelatedArtists(event.target.id);
    getArtistDetails(event.target.id);
    getSingleArtist(event.target.id);
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }

  const playMusic = (event) => {
    event.stopPropagation();
    setPlay(event.target.id);
    // audio.play();
  }


  const stopMusic = (event) => {
    event.stopPropagation();
    setPlay(null)
  }

  React.useEffect(() => {
    getRandomArtist();
  }, [])

  
  if (!randomArtist) {
    return (
      <Loader />
    )
  }

  return ( 
    <main className="random">
      {relatedArtists && 
        <InfoCard 
        artistDetails={artistDetails}
        handleClick={handleClick} 
      />}



      <div>
              <button onClick={getRandomArtist}>
                <FontAwesomeIcon spin={loading} icon={ faSync } />
              </button>
        <div className="row randomrow">
          <div className="image">
            <img src={randomArtist.artist.images[0].url}/>
          </div>
          <div className="artistinfo">
            <div className="row artist-header">
              <h1>{randomArtist.artist.name}</h1>
              <a target="_blank" className="external-tag" href={randomArtist.artist.external_urls.spotify}>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            </div>
            <div className="moreinfo">
              <small>{randomArtist.artist.followers.total} followers</small>
              <div className="tags">
                {randomArtist.artist.genres.map((genre) => <small>{genre}</small>)}
              </div>
            </div>
      
          </div>

        </div>

        <div className="info">
          <h2>Top Tracks</h2>
          <div className="related m-0">
            {randomArtist.topTracks.tracks.map((track) => 
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
          <div className="related m-0">
            {randomArtist.related.artists.map((a) => 
              <div>
                <div className="thumbnail" onClick={handleClick} >
                  <img src={a.images[0].url} id={a.id}/>
                </div>
                <p>{a.name}</p>
              </div>
            )}
          </div>
        </div>


      </div>
    </main> 
    );
}
 
export default Random;