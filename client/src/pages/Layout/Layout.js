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
import Following from "../Following/Following";
import SearchResults from "../SearchResults/SearchResults";
import Footer from "../../components/Footer/Footer";

import { getSearch } from "../../utils/spotifyService";

import './Layout.scss';

import { UserContext } from '../../context/userContext';

const Layout = (props) => {
    const user = React.useContext(UserContext);

    const [searchQuery, setSearchQuery] = React.useState();
    const [results, setResults] = React.useState();
    const [loading, setLoading] = React.useState();
  
    const { history } = props;

  
  
    const handleChange = async (event) => {
      setLoading(true);
      history.push(`/search`); 
      setSearchQuery(event.target.value);
      const searchResults = await getSearch(searchQuery);
      setResults(searchResults.data.artists.items);
      setLoading(false);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      history.push(`/search`); 
      const searchResults = await getSearch(searchQuery);
      setResults(searchResults.data.artists.items);
      setLoading(false);
    }

    return (
      <>
      <div class="row">
          <Sidebar/>
          <div className="main">
            <Header 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
              <Switch>
                <Route 
                  exact path="/"
                  render={() => <Index/>}
                /> 
                <Route 
                  exact path="/top"
                  render={() => <TopArtists/>}
                /> 
                <Route 
                  exact path="/following"
                  render={() => <Following/>}
                /> 
                <Route 
                exact path="/search"
                render={() => 
                <SearchResults
                  loading={loading}
                  results={results}
                  searchQuery={searchQuery}
                />}
                /> 
              </Switch>
          </div>
        </div>
      {/* <Footer /> */}
      <MusicPlayer />
      </>
    );
}

export default Layout;