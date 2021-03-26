import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Bars } from 'svg-loaders-react';
import { token } from "../../utils/spotifyService";

// import axios from "axios";

import Header from "../../components/Header/Header";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import Sidebar from '../../components/Sidebar/Sidebar';
import IndexPage from "../IndexPage/IndexPage"
import './Layout.scss';

import { UserContext } from '../../context/userContext';



const App = () => {
  const user = React.useContext(UserContext);
  console.log(user)

  if (!{token}) {
    return (
      <Bars fill="green" />
    )
  }
  else {
    return (
      <>
      <div class="row">
          <Sidebar />
          <div className="main">
            <Header />
              <Switch>
                <Route 
                  exactpath="/"
                  render={() => <IndexPage/>}
                /> 
              </Switch>
          </div>
        </div>
      <MusicPlayer />
      </>
    );

  }
}

export default App;