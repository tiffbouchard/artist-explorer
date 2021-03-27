import React from 'react';
import { UserContext } from '../../context/userContext';
import { logout } from '../../utils/spotifyService';
import Search from '../Search/Search';
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./Header.scss";

const Header = (props) => {
  const { user } = React.useContext(UserContext);
  const [show, setShow] = React.useState(false);



  const toggleMenu = (event) => {
    event.stopPropagation();
    setShow(!show)
  }
  
  return (
    <header>
      <Search
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
        />
      <div class="thumbnail-small dropdowntrigger">
        <img src={user.images && user.images[0].url} onClick={toggleMenu}/>
        <DropdownMenu show={show}/>
      </div>
    </header>
    );
}
 
export default Header;