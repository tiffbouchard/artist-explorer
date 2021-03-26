import React from 'react';
import { UserContext } from '../../context/userContext';

import "./Search.scss";

const Search = () => {
  const { user } = React.useContext(UserContext);

  return (
    <input placeholder="Search">
     
    </input>
    );
}
 
export default Search;

