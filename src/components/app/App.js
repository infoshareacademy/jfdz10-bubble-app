import React, { Component } from 'react';
// import Navigation from '../navigation/Navigation'
import {Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navigation /> */}
        <Route exact path="/logout" component={() => <h1>Goku</h1>} />
        <Route exact path = "/profile" component={() => <h1>Vegeta</h1>} />

      </div>
    );
  }
}

export default App;