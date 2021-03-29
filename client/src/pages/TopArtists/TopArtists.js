import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong, getArtist, getRelated, getAllArtistInfo, getUser} from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card"

import "./TopArtists.scss";

const TopArtists = () => {
  const [artists, setArtists] = React.useState(null);  
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  
  const [artistDetails, setArtistDetails] = React.useState(null);  

  
  const getArtists = async () => {
    const artists = await getTopArtistsLong();
    setArtists(artists.data)
  }
  

  const getSixMonths = async () => {
    const artists = await getTopArtistsMedium();
    setArtists(artists.data)
  }
  

  const getFourWeeks = async () => {
    const artists = await getTopArtistsShort();
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
  
  const getArtistDetails = async (artistId) => {
    const user = await getUser();
    const artistDetails = await getAllArtistInfo(artistId, user.data.country);
    setArtistDetails(artistDetails);

  }
  
  const handleClick = (event) => {
    event.stopPropagation();
    console.log(event.target);
    getRelatedArtists(event.target.id);
    getArtistDetails(event.target.id);
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
    <main className="content">
      <div className="header">
        <h1>Top Artists</h1>
        <div>
          <button onClick={getArtists}>All Time</button>
          <button onClick={getSixMonths}>Last 6 Months</button>
          <button onClick={getFourWeeks}>Last 4 Weeks</button>
        </div>
      </div>
      {relatedArtists && 
        <InfoCard
          artistDetails={artistDetails}
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