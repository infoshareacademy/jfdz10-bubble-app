import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Matches from '../matches/Matches'
import Navigation from '../navigation/Navigation'
import Players from '../players/Players'
import Profile from '../profile/Profile'
import Dashboard from '../dashboard/Dashboard'
import Player from '../player/Player'

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Navigation />
        <div className="ShownComponent">
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/addMatch" component={() => <h1>Here you can add a new match.</h1>} />
          <Route exact path="/matches" component={Matches} />
          <Route exact path = "/players" component={Players} />
          <Route exact path = "/profile" component={Profile} />
        </div>
      </div>
    );
  }
}

export default App;