import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getFollowing, getArtist, getRelated } from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card"

// import "./TopArtists.scss";

const Following = () => {
  const [artists, setArtists] = React.useState(null);  
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  

  
  const getFollowingArtists = async () => {
    const artists = await getFollowing();
    console.log(artists)
    setArtists(artists.data.artists);
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
    getFollowingArtists();
  }, [])

  
  if (!artists) {
    return (
      <Loader />
    )
  }

  return ( 
    <main className="content">
      <h1>Following</h1>
      {relatedArtists && <InfoCard 
          artists={relatedArtists} 
          currentArtist={singleArtist} 
          handleClick={handleClick} />}
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
 
export default Following;