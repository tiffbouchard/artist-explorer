import React, { Component } from 'react';

// import {getAccessToken}  from "./utils/spotifyService"
import {getHashParams} from "../../utils/paramsService"

import axios from "axios";

import './App.scss';

class App extends Component {
  state = {
    user: '',
  };

  getAccessToken = () => {
    const { access_token } = getHashParams();
    return access_token
  }

  getUser = async () => {
    const token = this.getAccessToken();

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    
    const user = await axios.get('https://api.spotify.com/v1/me', { headers });
    this.setState({user: user.data})
  }
  

    componentDidMount() {
      this.getUser();
    }




render() {
    return (
      <div className="App">
        {this.state.user && 
        <>
        <p>{this.state.user.display_name}</p>
        <p>{this.state.user.email}</p>
        <p>{this.state.user.country}</p>
        <img src={this.state.user.images[0].url}/>
        </>
        }

        <a href="http://localhost:8888/login">Login</a>
      </div>
    );
  }
}

export default App;