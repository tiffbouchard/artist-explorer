import React from 'react';

import Layout from "../../pages/Layout/Layout"
import LoginPage from "../../pages/LoginPage/LoginPage"
import './App.scss';

import { UserContext } from '../../context/userContext';
import { token } from "../../utils/spotifyService";


const App = (props) => {  
  return (
    <>
    {token ? <Layout /> : <LoginPage/> }
    </>
  );
}

export default App;