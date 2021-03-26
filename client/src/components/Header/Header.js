import React from 'react';
import { UserContext } from '../../context/userContext';
import { logout } from '../../utils/spotifyService';

const Header = () => {
  const { user } = React.useContext(UserContext);

  return (
    <button onClick={logout}>
      Logout
    </button>
    );
}
 
export default Header;