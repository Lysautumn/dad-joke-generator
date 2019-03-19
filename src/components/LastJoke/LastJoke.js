import React, { Component } from 'react';

class LastJoke extends Component {

  render() {
    return (
      <div>
        <p>Last joke generated: {this.props.lastJoke}</p>
      </div>
    );
  }
}

export default LastJoke;