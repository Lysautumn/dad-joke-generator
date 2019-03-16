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
        console.log(response.data);
        let jokesArray = response.data;
        this.setState({
          originalJokes: jokesArray,
        })
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
