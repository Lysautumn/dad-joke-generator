import React, { Component } from 'react';
import axios from 'axios';
import titlegen from 'titlegen';
import './App.css';
import NewJokeButton from '../NewJokeButton/NewJokeButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalJokes: [],
      generatedJokes: [],
      newJoke: '',
    }
  }
 
  // when the component mounts, the fetchJokes function will run
  componentDidMount() {
    this.fetchJokes();
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
  // newly created joke will also be added to the generatedJokes array on state
  createNewJoke = () => {
    let generator = titlegen.create();
    
    generator.config.min_word_count = 10;
    generator.config.max_word_count = 30;

    generator.feed(this.state.originalJokes);

    let newGeneratedJoke = generator.next();

    

    this.setState({
      generatedJokes: [ ...this.state.generatedJokes, newGeneratedJoke ],
      newJoke: newGeneratedJoke,
    }) 
    localStorage.setItem('jokeHistory', JSON.stringify(this.state.generatedJokes));
  }

  render() {
    return (
      <div className="App">
        <NewJokeButton createNewJoke={this.createNewJoke} />
        <p>{this.state.newJoke}</p>
      </div>
    );
  }
}

export default App;
