import React from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from "react-router-dom";

import './Sidebar.scss';

const Sidebar = () => {
  const { user } = React.useContext(UserContext);

  return (
    <aside>
      {user &&
      <div class="user-info">
        <div class="thumbnail">
          <img src={user.images && user.images[0].url}/>
        </div>
        <p class="primary-text">{user.display_name}</p>
        <p class="secondary-text">{user.email}</p>
      </div> 
      }
      <ul class="side-nav">
        <Link className="link" to="">
          <li>Recent</li>
        </Link>
        <Link className="link" to="">
          <li>Top Artists</li>
        </Link>
        <Link className="link" to="">
          <li>Random</li>
        </Link>
        <Link className="link" to="">
          <li>Following</li>
        </Link>
      </ul>
    </aside>
    );
}

export default Sidebar;