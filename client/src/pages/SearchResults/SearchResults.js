import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getArtist, getRelated, getAllArtistInfo, getUser, followArtist} from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card"

// import "./TopArtists.scss";

const SearchResults = (props) => {
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  
  const [artistDetails, setArtistDetails] = React.useState(null);  
  const [following, setFollowing] = React.useState();  


  const handleFollow = async (event) => {
    const following = await followArtist(event.target.id);
    console.log(following.status)
    setFollowing(following.status)
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
    setFollowing(null);
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }

  const { loading, results, searchQuery } = props;
  
  if (loading) {
    return (
      <Loader />
      )
    }
    
    else if (results && results.length === 0) {
      return (
        <main className="content">
          <h1>No results for {searchQuery}</h1>
        </main>
      )
    }

    return ( 
    <main className="content">
      <h1>Search Results for {searchQuery}</h1>
      {relatedArtists && 
        <InfoCard 
        handleFollow={handleFollow}
        following={following}
          artistDetails={artistDetails}
          handleClick={handleClick} 
        />}
      <div className="card-container">
      {results && results.map((a) => 
          <Card 
            id={a.id}
            handleClick={handleClick} 
            image={a.images[0] ? a.images[0].url : null} 
            name={a.name}
          />
        )}
        
      </div>
    </main> 
    );
}
 
export default SearchResults;