import React from 'react';
import { UserContext } from '../../context/userContext';
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { getTopArtistsLong, getArtist, getRelated } from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";

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
    getRelatedArtists(event.target.id);
    getSingleArtist(event.target.id)
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
      <h1>Top Artists</h1>
      {relatedArtists && <InfoCard artists={relatedArtists} currentArtist={singleArtist}/>}
      <div className="card-container">
      {artists && artists.items.map((a) => 
          <div>
            <div class="card" key={a.id} onClick={handleClick}>
                <div class="img-container">
                  <img src={a.images[1].url} id={a.id}/>
                </div>
                <div className="name">{a.name}</div>
            </div>
          </div>
        )}
        
      </div>
    </main> 
    );
}
 
export default TopArtists;