import React from 'react';
import {getHashParams} from "../../utils/paramsService";
import { UserContext } from '../../context/userContext';

import axios from "axios";



import "./IndexPage.scss";

const IndexPage = () => {
  const [artists, setArtists] = React.useState(null);  
  
  const getAccessToken = () => {
    const { access_token } = getHashParams();
    return access_token
  }
  
  const getArtists = async () => {
    const token = getAccessToken();
    
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const artists = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });
    
    setArtists(artists.data)
  }
  
  React.useEffect(() => {
    getArtists();
  }, [])

  

  return ( 
    <main>
      <h1>Top Artists</h1>
      <div class="card-container">
      {artists && artists.items.map((a) => 
        <div class="card">
          <div class="img-container">
            <img src={a.images[1].url}/>
          </div>
          <div class="name">{a.name}</div>
        </div>
        )}
      </div>
    </main> 
    );
}
 
export default IndexPage;