import React from 'react';
import {useState, useEffect} from "react";
import "./App.css"

const App = () => {
  const [error, setError] = useState(null);
  const [item, setItem] = useState([]);
  const [number, setNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("corona");
  const key = "t0VhO5TvTZOUUoPGsx3SkBeP64WFeyOO";

  const request = () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchTerm}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setNumber(result.data.length)
          let i = Math.floor(Math.random() * number);
          setItem(result.data[i].images.downsized_medium);
        }
      )
      .catch(error => {
        setError(error)
      })
  }

  useEffect(request, []);

  if(error === null){
    return(
      <div className="container">
        <div className="explanation"><h1>Whenever you click the button you get a GIF based on the topic you chose below</h1></div>
        <div className="input-container">
          <input className="input" type="text" placeholder="Choose Topic" onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <button className="button" onClick={request}>Get Lucky!</button>
        <div className="gif-container">
          <img src={item.url} alt="here should be a gif"></img>
        </div>
      </div>
      ) 
  }
  else{
    console.log(error);
    return(
      <div>There was an error look into the console of your browser for details.</div>
    )
  }
}

export default App;
