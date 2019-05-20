import React, { Component } from 'react'

import { Route } from 'react-router-dom'

import Navigation from '../navigation/Navigation'
import Players from '../players/Players'
import Profile from '../profile/Profile'
import Dashboard from '../dashboard/Dashboard'
import Matches from '../matches/Matches'
import AddMatch from '../matches/addMatch/AddMatch'
import SportDetails from "../Sport-details/Sport-details";
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBvqyvl7IxTyYNhTdiaLBffP1X6RtRVMxs",
  authDomain: "bubble-app-e36c0.firebaseapp.com",
  databaseURL: "https://bubble-app-e36c0.firebaseio.com",
  projectId: "bubble-app-e36c0",
  storageBucket: "bubble-app-e36c0.appspot.com",
  messagingSenderId: "1008042038295"
};

firebase.initializeApp(config);



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