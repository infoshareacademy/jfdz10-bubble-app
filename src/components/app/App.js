import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Navigation from '../navigation/Navigation'
import Players from '../players/Players'
import Dashboard from '../dashboard/Dashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="ShownComponent">
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/addMatch" component={() => <h1>Here you can add a new match.</h1>} />
          <Route exact path="/matches" component={() => <h1>Here you can see planned matches.</h1>} />
          <Route exact path = "/players" component={Players} />
          <Route exact path = "/profile" component={() => <h1>This is your profile.</h1>} />
        </div>
      </div>
    );
  }
}

export default App;