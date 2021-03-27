import React from 'react';
import { UserContext } from '../../context/userContext';
import { logout } from '../../utils/spotifyService';
import Search from '../Search/Search';

import "./Header.scss";

const Header = (props) => {
  const { user } = React.useContext(UserContext);


  return (
    <header>
      <Search
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
      />
      <button onClick={logout}>
        Logout
      </button>
    </header>
    );
}
 
export default Header;