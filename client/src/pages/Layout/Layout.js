import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from '../../components/Sidebar/Sidebar';
import TopArtists from "../TopArtists/TopArtists";
import Following from "../Following/Following";
import Random from "../Random/Random";
import SearchResults from "../SearchResults/SearchResults";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import Modal from "../../components/Modal/Modal";
import { getSearch, token } from "../../utils/spotifyService";
import { UserContext } from '../../context/userContext';
import Loader from '../../components/Loader/Loader';


import './Layout.scss';


const Layout = (props) => {
    const { user }= React.useContext(UserContext);
    const { history } = props;

    const [searchQuery, setSearchQuery] = React.useState();
    const [results, setResults] = React.useState();
    const [loading, setLoading] = React.useState();
    const [searching, setSearching] = React.useState();
    const [modal, setModal] = React.useState(true);  

    const closeModal = () => {
      setModal(false);
    }
  
    const handleChange = async (event) => {
      setLoading(true);
      setSearching(true);
      history.push(`/search`); 
      setSearchQuery(event.target.value);
      const searchResults = await getSearch(searchQuery);
      setResults(searchResults.data.artists.items);
      setLoading(false);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setSearching(true);
      history.push(`/search`); 
      const searchResults = await getSearch(searchQuery);
      setResults(searchResults.data.artists.items);
      setLoading(false);
    }


    if (!token) {
      return (
        <Loader/>
      )
    }

    return (
      <>
      <MobileHeader/>
      {modal && <Modal closeModal={closeModal} title={`Welcome back, ${user.display_name}!`} type="welcome"/>}
      <div className="row">
          <Sidebar
            searching={searching}
          />
          <div className="main">
            <Header 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
              <Switch>
                <Route 
                  exact path="/"
                  render={() => <TopArtists/>}
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
                  exact path="/random"
                  render={() => <Random/>}
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
      </>
    );
}

export default Layout;