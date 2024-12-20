
import React, { useState } from "react";
import './../styles/App.css';

const API_KEY = "99eb9fd1"
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

const App = () => {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [logError, setLogError] = useState(false);

  function handleClick(e){
    e.preventDefault();
    fetch(`${API_URL}&s=${value}`)
    .then(resolved => resolved.json())
    .then(data => {
      console.log(data.Search); 
      if(data.Error){
        setLogError(true);
        setValue("");
      }else{
        setMovies(data.Search);
        setLogError(false);
        setValue("");
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
  return (
    <div>
        <form>
          <label htmlFor="search">Search Movie</label><br />
          <input type="text" placeholder="Enter movie name.." value={value} onChange={(e) => {setValue(e.target.value)}}/>
          <button onClick={(e)=>{handleClick(e)}}>Search</button>
        </form>
        <ul>
          {
            movies.length ? 
            movies.map((movie, index) => {
              return <li key={index}>
                <h1>{movie.Title} ({movie.Year})</h1>
                <img src={movie.Poster}alt="loading.."/>
              </li>
            }) : 
            logError && <li className="error">Invalid movie name. Please try again.</li>      
          }
        </ul>
    </div>
  )
}

export default App
