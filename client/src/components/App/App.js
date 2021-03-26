import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

// import axios from "axios";

import UserProvider from "../../context/userContext";
import Header from "../Header/Header"
import Sidebar from '../Sidebar/Sidebar';
import IndexPage from "../../pages/IndexPage/IndexPage"
import './App.scss';



class App extends Component {
  state = {
  };

render() {
    return (
      <UserProvider>
        <Header {...this.props}/>
        <Sidebar />
        <Switch>
          <Route 
            exactpath="/"
            render={() => <IndexPage/>}
          />
        </Switch>
      </UserProvider>
    );
  }
}

export default App;