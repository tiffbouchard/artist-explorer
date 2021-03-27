import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getSearch, getArtist, getRelated } from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card"

// import "./TopArtists.scss";

const SearchResults = (props) => {
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  



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

  const { loading, results, searchQuery } = props;
  
  if (loading) {
    return (
      <Loader />
      )
    }
    
    else if (results && results.length === 0) {
      return (
        <main class="content">
          <h1>No results for {searchQuery}</h1>
        </main>
      )
    }

    return ( 
    <main class="content">
      <h1>Search Results for {searchQuery}</h1>
      {relatedArtists && 
        <InfoCard 
          artists={relatedArtists} 
          currentArtist={singleArtist} 
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