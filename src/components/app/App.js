import React, { Component } from 'react';
import Navigation from '../navigation/Navigation'
import {Route} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
      </div>
    );
  }
}

export default App;