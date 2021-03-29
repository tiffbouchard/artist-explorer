import React from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/Spotify_Icon_RGB_Green.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faDice, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'


import './Sidebar.scss';

const Sidebar = (props) => {
  const { user } = React.useContext(UserContext);
  
  const [selected, setSelected] = React.useState();

  const toggleClass = (category) => {
    setSelected(category)
  }


  const handleClick = (event) => {
    toggleClass(event.target.id)
  }


  let location = useLocation();


  const getPath = () => {
    setSelected(location.pathname.replace("/", ""));
  }


  React.useEffect(() => {
    getPath();
  }, [])



  return (
    <aside>
      <div className="user-info">
        <div className="thumbnail spotify">
          <Link to="/">
            <img src={logo}/>
          </Link>
        </div>
        <h2>Artist Explorer</h2>
      </div> 
      <ul className="side-nav">
        {/* <Link className="link" to="/recent">
          <li className={selected == "recent" ? 'active' : null} onClick={handleClick} id="recent">Recent</li>
        </Link> */}
        <Link className="link" to="/top">
          <li className={selected == "top" ? 'active' : null}  onClick={handleClick} id="top">
            <FontAwesomeIcon icon={faTrophy} />&nbsp;
            Top Artists
          </li>
        </Link>
        <Link className="link" to="/random">
          <li className={selected == "random" ? 'active' : null}  onClick={handleClick} id="random">
            <FontAwesomeIcon icon={faDice} />&nbsp;
            Random
          </li>
        </Link>
        <Link className="link" to="/following">
          <li className={selected == "following" ? 'active' : null}  onClick={handleClick} id="following">
            <FontAwesomeIcon icon={faUserPlus} />&nbsp;
            Following
          </li>
        </Link>
      </ul>
    </aside>
    );
}

export default Sidebar;

