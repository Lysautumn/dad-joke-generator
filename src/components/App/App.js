import React, { Component } from 'react';
import axios from 'axios';
import titlegen from 'titlegen';
import './App.css';
import NewJokeButton from '../NewJokeButton/NewJokeButton';
import NewJoke from '../NewJoke/NewJoke';
import LastJoke from '../LastJoke/LastJoke';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalJokes: [],
      newJoke: '',
    }
  }
  // lastJoke variable will hold the joke currently being stored in the browser's localStorage
  lastJoke = '';

  // when the component mounts, the fetchJokes function will run
  // will also get last joke generated off of localStorage to display
  componentDidMount() {
    this.fetchJokes();
    this.lastJoke = localStorage.getItem('jokeHistory');
  }

  // fetchJokes will make an axios GET request to server to get joke data
  // it will take the response and convert array of objects into an array of joke strings
  // it will then setState to store the jokes strings in originalJokes property
  fetchJokes = () => {
    axios.get('/newJokes')
      .then(response => {
        let jokesArray = response.data;
        for (let jokeObject of jokesArray) {
          this.setState({
            originalJokes: [ ...this.state.originalJokes, jokeObject.joke],
          })
        }
      })
      .catch(error => {
        alert('There was an error, please try again!');
      })
  }

  // button click will trigger createNewJoke function
  // createNewJoke uses titlegen library to create new jokes using Markov Chain
  // referenced blog post here: https://www.raymondcamden.com/2018/01/16/generating-random-cure-song-titles
  // newJoke property on state will be set with newly generated joke after each button click
  // newly created joke will be stored in the browser's localStorage
  createNewJoke = () => {
    let generator = titlegen.create();
    
    generator.config.min_word_count = 10;
    generator.config.max_word_count = 30;

    generator.feed(this.state.originalJokes);

    let newGeneratedJoke = generator.next();

    this.setState({
      newJoke: newGeneratedJoke,
    }) 
    // changes joke on DOM before resetting localStorage
    this.lastJoke = localStorage.getItem('jokeHistory');
    localStorage.setItem('jokeHistory', newGeneratedJoke);
  }

  render() {
    return (
      <div className="App">
        <h1>Dad Joke-inator</h1>
        <NewJokeButton createNewJoke={this.createNewJoke} />
        <NewJoke newJoke={this.state.newJoke} />
        <LastJoke lastJoke={this.lastJoke}/>
      </div>
    );
  }
}

export default App;
