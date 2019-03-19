import React, { Component } from 'react';

let styles = {
    fontWeight: 'bold',
}

class NewJoke extends Component {

  render() {
    return (
      <div>
        <p style={styles}>{this.props.newJoke}</p>
      </div>
    );
  }
}

export default NewJoke;