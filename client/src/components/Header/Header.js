import React from 'react';
import { UserContext } from '../../context/userContext';
import { logout } from '../../utils/spotifyService';
import Search from '../Search/Search';

import "./Header.scss";

const Header = () => {
  const { user } = React.useContext(UserContext);

  return (
    <header>
      <Search/>
      <button onClick={logout}>
        Logout
      </button>
    </header>
    );
}
 
export default Header;