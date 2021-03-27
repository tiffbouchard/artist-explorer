import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { token } from "../../utils/spotifyService";

// import axios from "axios";

import Header from "../../components/Header/Header";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import Sidebar from '../../components/Sidebar/Sidebar';
import Index from "../Index/Index";
import TopArtists from "../TopArtists/TopArtists";


import './Layout.scss';

import { UserContext } from '../../context/userContext';



const Layout = () => {
    const user = React.useContext(UserContext);

    return (
      <>
      <div class="row">
          <Sidebar />
          <div className="main">
            <Header />
              <Switch>
                <Route 
                  exact path="/"
                  render={() => <Index/>}
                /> 
                <Route 
                  exact path="/top"
                  render={() => <TopArtists/>}
                /> 
              </Switch>
          </div>
        </div>
      <MusicPlayer />
      </>
    );
}

export default Layout;