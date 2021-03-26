import React from "react";

import axios from "axios";

import {getHashParams} from "../utils/paramsService"

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = {
    user: '',
  };

  componentDidMount = () => {
    this.getUser();
  }
  
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
  


  render() {
    return (
      <UserContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext };

export default UserProvider;