import React from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from "react-router-dom";

import './Sidebar.scss';

const Sidebar = () => {
  const { user } = React.useContext(UserContext);
  
  const [selected, setSelected] = React.useState();

  const toggleClass = (event) => {
    setSelected(event.target.id)
  }


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
        <Link className="link" to="/recent">
          <li className={selected == "recent" ? 'active' : null} onClick={toggleClass} id="recent">Recent</li>
        </Link>
        <Link className="link" to="/top">
          <li className={selected == "top" ? 'active' : null}  onClick={toggleClass} id="top">Top Artists</li>
        </Link>
        <Link className="link" to="/random">
          <li className={selected == "random" ? 'active' : null}  onClick={toggleClass} id="random">Random</li>
        </Link>
        <Link className="link" to="/following">
          <li className={selected == "following" ? 'active' : null}  onClick={toggleClass} id="following">Following</li>
        </Link>
      </ul>
    </aside>
    );
}

export default Sidebar;

