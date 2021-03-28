import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getTopArtistsShort, getArtist, getRelated, getRecommendationsForArtist, getAllArtistInfo, getUser} from "../../utils/spotifyService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'


import "./Random.scss";

const Random = () => {
  const [artists, setArtists] = React.useState(null);  
  const [singleArtist, setSingleArtist] = React.useState(null);  
  const [relatedArtists, setRelatedArtists] = React.useState(null);  
  const [randomArtist, setRandomArtist] = React.useState(null);  
  const [loading, setLoading] = React.useState(false);  
  const [play, setPlay] = React.useState(false);  
  

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

  const playMusic = () => {
    setPlay(!play);
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
      {/* {relatedArtists && 
        <InfoCard 
        artists={relatedArtists} 
        currentArtist={singleArtist} 
        handleClick={handleClick} 
      />} */}



      <div>
        <div className="row randomrow">
          <div className="image">
            <img src={randomArtist.artist.images[0].url}/>
          </div>
          <div className="artistinfo">
            <div className="row artist-header">
              <h1>{randomArtist.artist.name}</h1>
              <button onClick={getRandomArtist}>
                <FontAwesomeIcon spin={loading} icon={ faSync } />
              </button>
            </div>
            <div className="moreinfo">
              <small>{randomArtist.artist.followers.total} followers</small>
              {/* <a href={randomArtist.artist.external_urls.spotify}>Open in Spotify</a> */}
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
                {track.is_playable && 
                  <audio autoPlay={play}>
                    <source src={track.preview_url} type=""/>
                  </audio>
                }
                <div className="album-thumbnail">
                  <img src={track.album.images[0].url} onMouseEnter={playMusic} onMouseLeave={playMusic}/>
                </div>
              </div>
            )}
          </div>
          <h2>Related Artists</h2>
          <div className="related m-0">
            {randomArtist.related.artists.map((a) => 
              <div>
                <div className="thumbnail">
                  <img src={a.images[0].url}/>
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