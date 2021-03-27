import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getTopArtistsLong, getArtist, getRelated } from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card"

import "./TopArtists.scss";

const TopArtists = () => {
  const [artists, setArtists] = React.useState(null);  
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  

  
  const getArtists = async () => {
    const artists = await getTopArtistsLong();
    setArtists(artists.data)
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
    getArtists();
  }, [])

  
  if (!artists) {
    return (
      <Loader />
    )
  }

  return ( 
    <main class="content">
      <div class="header">
        <h1>Top Artists</h1>
        <div>
          <button>All Time</button>
          <button>Last 6 Months</button>
          <button>Last 4 Weeks</button>
        </div>
      </div>
      {relatedArtists && 
        <InfoCard 
          artists={relatedArtists} 
          currentArtist={singleArtist} 
          handleClick={handleClick} 
        />}
      <div className="card-container">
      {artists && artists.items.map((a) => 
          <Card 
            id={a.id}
            handleClick={handleClick} 
            image={a.images[0].url} 
            name={a.name}
          />
        )}
        
      </div>
    </main> 
    );
}
 
export default TopArtists;