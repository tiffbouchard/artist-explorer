import React from "react";

import axios from "axios";

import {getHashParams} from "../utils/paramsService";
import { getUser ,token } from "../utils/spotifyService";

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = {
    user: '',
  };

  componentDidMount = () => {
    this.getUser();
  }
  

  getUser = async () => {
    const user = await getUser();
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