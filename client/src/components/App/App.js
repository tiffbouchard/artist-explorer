import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

// import axios from "axios";

import UserProvider from "../../context/userContext";
import Header from "../Header/Header";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Sidebar from '../Sidebar/Sidebar';
import IndexPage from "../../pages/IndexPage/IndexPage"
import './App.scss';



class App extends Component {
  state = {
  };

render() {
    return (
      <UserProvider>
        <div class="row">
          <Sidebar />
          <div className="main">
            <Header {...this.props}/>
            <Switch>
              <Route 
                exactpath="/"
                render={() => <IndexPage/>}
              />
            </Switch>
          </div>
        </div>
        <MusicPlayer />
      </UserProvider>
    );
  }
}

export default App;