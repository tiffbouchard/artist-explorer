import React from 'react';
import { UserContext } from '../../context/userContext';

const Header = () => {
  const { user } = React.useContext(UserContext);

  // const loginBtn = () => {
  //   return (
  //   {user ? <a href="http://localhost:8888/login">Login</a> : 
  //   }
  //   )
  // }

  return (
    <header>
      <loginBtn/>
      <a href="http://localhost:8888/login">Login</a>
    </header>
    );
}
 
export default Header;