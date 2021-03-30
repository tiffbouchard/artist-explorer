import React from 'react';

import { UserContext } from '../../context/userContext';
import { logout } from '../../utils/spotifyService';

import "./DropdownMenu.scss";

const Dropdown = (props) => {
  const { user } = React.useContext(UserContext);

  
  return (
    <div className={props.show ? "dropdown activemenu" : "dropdown"}>
      <small>{user.display_name}</small>
      <small>{user.email}</small>
      <button onClick={logout}>
        Logout
      </button>
    </div>
    );
}
 
export default Dropdown;