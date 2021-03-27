import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getTopArtistsShort, getArtist, getRelated, getRecommendationsForArtist } from "../../utils/spotifyService";
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
    const artistDetails = await getArtist(randomArtist.data.tracks[0].artists[0].id);
    setRandomArtist(artistDetails.data);
    getRelatedArtists(randomArtist.id);
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
        <h1>{randomArtist.name}</h1>
        <button onClick={getRandomArtist}>
          <FontAwesomeIcon spin={loading} icon={ faSync } />
        </button>
      </div>

      {relatedArtists && 
        <InfoCard 
          artists={relatedArtists} 
          currentArtist={singleArtist} 
          handleClick={handleClick} 
        />}
      <div>
      <small>{randomArtist.followers.total} followers</small>
      <div className="image">
        <img src={randomArtist.images[0].url}/>
      </div>
        
      </div>
    </main> 
    );
}
 
export default Random;