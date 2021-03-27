import React from 'react';
import { getSearch } from "../../utils/spotifyService";


import "./Search.scss";

const Search = (props) => {
  // const [searchQuery, setSearchQuery] = React.useState();
  // const [results, setResults] = React.useState();



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
      <input placeholder="Search" onChange={props.handleChange} value={props.searchQuery}/>
    </form>
    );
}
 
export default Search;

