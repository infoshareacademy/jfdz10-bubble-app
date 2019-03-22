import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SportDetails from '../Sport-details/Sport-details';
import Navigation from '../navigation/Navigation'
import Players from '../players/Players'
import Profile from '../profile/Profile'
import Dashboard from '../dashboard/Dashboard'
import Matches from '../matches/Matches'
import AddMatch from '../matches/addMatch/AddMatch'


class App extends Component {
  render() {
    return (
      <div className="App">
        <SportDetails />
        <Navigation />
        <div className="ShownComponent">
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/addMatch" component={AddMatch} />
          <Route exact path="/matches" component={Matches} />
          <Route exact path="/players" component={Players} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </div >
    );
  }
}

export default App;