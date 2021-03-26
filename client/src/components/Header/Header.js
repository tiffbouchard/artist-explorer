import React from 'react';
import { UserContext } from '../../context/userContext';
import { logout } from '../../utils/spotifyService'

import Button from "../Button/Button"

const Header = () => {
  const { user } = React.useContext(UserContext);




  // {user ? <a href="http://localhost:8888/login">Login</a> : <a href="http://localhost:8888/login">Logout</a> }
  
  return (
    <header>
      <Button 
        // onClick={() => !user && logout}
        link="http://localhost:8888/login"
        label={user ? "Logout" : "Login"}
      />
    </header>
    );
}
 
export default Header;

