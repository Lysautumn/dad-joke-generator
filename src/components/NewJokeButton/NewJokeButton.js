import React, { Component } from 'react';

class NewJokeButton extends Component {

  render() {
    return (
      <div className="App">
        <button onClick={this.props.createNewJoke}>Generate Joke</button>
      </div>
    );
  }
}

export default NewJokeButton;