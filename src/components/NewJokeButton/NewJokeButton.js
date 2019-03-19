import React, { Component } from 'react';

class NewJokeButton extends Component {

  render() {
    return (
      <div>
        <button onClick={this.props.createNewJoke}>Generate Joke</button>
      </div>
    );
  }
}

export default NewJokeButton;