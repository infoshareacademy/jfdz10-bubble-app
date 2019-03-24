import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Players from "../players/Players";
import Profile from "../profile/Profile";
import Dashboard from "../dashboard/Dashboard";
import Matches from "../matches/Matches";
import AddMatch from "../matches/addMatch/AddMatch";
import SportDetails from "../Sport-details/Sport-details";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="ShownComponent">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/addMatch" component={AddMatch} />
          <Route exact path="/matches" component={Matches} />
          <Route exact path="/matches/:id" component={SportDetails} />
          <Route exact path="/players" component={Players} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </div>
    );
  }
}

export default App;
