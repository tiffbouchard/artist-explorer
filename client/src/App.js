import React, { Component } from 'react';


import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  
render() {
    return (
      <div className="App">
        <a href="http://localhost:8888/login">Login</a>
      </div>
    );
  }
}

export default App;