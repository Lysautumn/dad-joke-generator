import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import NewJokeButton from '../NewJokeButton/NewJokeButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalJokes: [],
      newJoke: '',
    }
  }

  componentDidMount() {
    this.fetchJokes();
  }

  // fetchJokes will make an axios GET request to icanhazdadjoke API
  fetchJokes = () => {
    axios.get('/newJokes')
      .then(response => {
        let jokesArray = response.data;
        for (let jokeObject of jokesArray) {
          this.setState({
            originalJokes: [ ...this.state.originalJokes, jokeObject.joke ],
          })
        }
      })
  }

  render() {
    return (
      <div className="App">
        <NewJokeButton />
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default App;
