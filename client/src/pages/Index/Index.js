import React from 'react';
import { UserContext } from '../../context/userContext';
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { getTopArtistsLong, getArtist, getRelated } from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";

// import "./Index.scss";

const IndexPage = () => {
  // if (!artists) {
  //   return (
  //     <Loader />
  //   )
  // }

  return ( 
    <main class="content">
      <h1>Home</h1>
    </main> 
    );
}

export default IndexPage;