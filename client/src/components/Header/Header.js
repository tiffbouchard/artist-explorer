import React from 'react';
import { UserContext } from '../../context/userContext';

const Header = () => {
  const { user } = React.useContext(UserContext);
  return (
    <header>
        <a href="http://localhost:8888/login">Login</a>
        {user &&
        <>
        <p>{user.display_name}</p>
        <p>{user.email}</p>
        <p>{user.country}</p>
        <img src={user.images && user.images[0].url}/>
        </> 
        }
    </header>
    );
}
 
export default Header;