import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getTopArtistsShort, getArtist, getRelated, getRecommendationsForArtist, getAllArtistInfo, getUser} from "../../utils/spotifyService";
import { UserContext } from '../../context/userContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, fa } from '@fortawesome/free-solid-svg-icons'

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card"

import "./Random.scss";

const Random = () => {
  const [artists, setArtists] = React.useState(null);  
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  
  const [randomArtist, setRandomArtist] = React.useState(null);  
  const [loading, setLoading] = React.useState(false);  
  

  const getSeeds = async () => {
    const artistsList = await getTopArtistsShort();
    const max = artistsList.data.items.length;
    const min = 0;
    var i = 0;
    var randomIdx;
    var randArtistList = [];

    while (i < 4) {
      randomIdx = Math.floor(Math.random() * (max - min + 1)) + min;
      if (artistsList.data.items[randomIdx].id) {
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
  
  
  const handleClick = (event) => {
    event.stopPropagation();
    console.log(event.target)
    getRelatedArtists(event.target.id);
    getSingleArtist(event.target.id);
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
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
    <main class="random">
      <div class="artistheader">
        <h1>{randomArtist.artist.name}</h1>
        <button onClick={getRandomArtist}>
          <FontAwesomeIcon spin={loading} icon={ faSync } />
        </button>
      </div>

      {/* {relatedArtists && 
        <InfoCard 
          artists={relatedArtists} 
          currentArtist={singleArtist} 
          handleClick={handleClick} 
        />} */}
      <div>
      <small>{randomArtist.artist.followers.total} followers</small>
      <div className="image">
        <img src={randomArtist.artist.images[0].url}/>
      </div>

      {randomArtist.artist.external_urls.spotify}
      {randomArtist.artist.genres}
      
      {randomArtist.related.artists.map((a) => 
        <div>
          <p>{a.name}</p>
          <div class="thumbnail">
            <img src={a.images[0].url}/>
          </div>
        </div>
      )}


      {randomArtist.topTracks.tracks.map((track) => 
        <div>
          <p>{track.name}</p>
          <div class="album-thumbnail">
            <img src={track.album.images[0].url}/>
          </div>
        </div>
      )}
        
        
      </div>
    </main> 
    );
}
 
export default Random;