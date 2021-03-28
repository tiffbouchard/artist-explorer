import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


import "./Search.scss";

const Search = (props) => {
  // const [focus, setFocus] = React.useState(false);
  // // const [results, setResults] = React.useState();

  // const focusForm = () => {
  //   setFocus(!focus)
  // }


  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   setSearchQuery(event.target.value);
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const searchResults = await getSearch(searchQuery);
  //   setResults(searchResults);
  //   console.log(searchResults);
  // }


  return (
    <form onSubmit={props.handleSubmit}>
      <FontAwesomeIcon icon={faSearch} />
      <input placeholder="Search" onChange={props.handleChange} value={props.searchQuery}/>
    </form>
    );
}
 
export default Search;

