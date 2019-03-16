import React, { Component } from 'react';
<<<<<<< HEAD
import Players from '../players/Players'

=======
import Navigation from '../navigation/Navigation'
import {Route} from 'react-router-dom'
>>>>>>> 552b66fca826240305943e91f4a8f9f466d84816

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <Players />
=======
        <Navigation />
        <Route exact path="/logout" component={() => <h1>Goku</h1>} />
        <Route exact path = "/profile" component={() => <h1>Vegeta</h1>} />

>>>>>>> 552b66fca826240305943e91f4a8f9f466d84816
      </div>
    );
  }
}

export default App;