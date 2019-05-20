import React, { Component } from "react";
import { Table } from 'semantic-ui-react'

import MatchesForm from './MatchesForm'
import MatchesTable from './MatchesTable'

import './Matches.css'
import SportDetails from "../Sport-details/Sport-details";
import firebase from 'firebase'


class Matches extends Component {

  state = {
    matches: [],
    sports: [],
    players: [],
    user: [],
    filter: {
      location: '',
      sports: [],
    },
    filterVisible: false,
    clickedMatch: {},
    refs: []
  };

  componentDidMount() {
    this.getMatches()
    this.getSports()
    this.getPlayers()
    this.getUser()
  }

  componentWillUnmount() {
    this.state.refs.forEach(ref => ref.off());
  }

  getMatches = () => {
    const matchesRef = firebase.database().ref('matches');

    matchesRef.on('value',
      snapshot => {
        this.setState({
          matches: snapshot.val()
        })
      });

    const newRefs = [matchesRef, ...this.state.refs];

    this.setState({
      refs: newRefs
    })
  }

  getSports = () => {
    const sportsRef = firebase.database().ref('sports');

    sportsRef.on('value',
      snapshot => {
        this.setState({
          sports: snapshot.val()
        })
      });

    const newRefs = [sportsRef, ...this.state.refs];

    this.setState({
      refs: newRefs
    })
  }

  getPlayers = () => {
    const playersRef = firebase.database().ref('players');

    playersRef.on('value',
      snapshot => {
        this.setState({
          players: snapshot.val()
        })
      });

    const newRefs = [playersRef, ...this.state.refs];

    this.setState({
      refs: newRefs
    })
  }

  getUser = () => {
    const userRef = firebase.database().ref('user');

    userRef.on('value',
      snapshot => {
        this.setState({
          user: snapshot.val()
        })
      });

    const newRefs = [userRef, ...this.state.refs];

    this.setState({
      refs: newRefs
    })
  }

  setNewFilter = (locationReceived, sportReceived) => {

    this.setState({
      filter: {
        location: locationReceived,
        sports: sportReceived,
      }
    })
    this.toggleFilter()
  }

  toggleFilter = () => {
    this.state.filterVisible ? this.setState({ filterVisible: false }) : this.setState({ filterVisible: true })
  }

  filterMatches = (matches) => {

    return matches.filter(
      match => (
        match.localization.city.toLowerCase().includes(this.state.filter.location.toLowerCase())
      ))
      .filter(
        match => (
          this.state.sports
            .filter(sport => match.sportID === sport.id)
        ).some(sport => (this.state.filter.sports).includes(sport.id)) || this.state.filter.sports[0] === undefined)
  }

  saveClickedMatchInfo = match => {
    this.setState({
      clickedMatch: this.state.matches.find(
        chosenMatch => chosenMatch.date === match.date
      )
    });
  };

  handleMatchClick = e => {
    const match = document.querySelector(".sport-details");
    const matchList = document.querySelector(".matches");
    if (match.style.display === "none") {
      this.saveClickedMatchInfo(e);
      match.style.display = "flex";
      matchList.style.display = "none";
    } else {
      match.style.display = "none";
      matchList.style.display = "block";
    }
  }

  render() {
    console.log(this.state.matches)
    return (
      <div>

        <SportDetails
          toggleMatchView={this.handleMatchClick}
          matches={this.state.matches}
          players={this.state.players}
          sports={this.state.sports}
          user={this.state.user}
          match={this.state.clickedMatch}
        />

        <MatchesForm
          toggleFilter={this.toggleFilter}
          filterStatus={this.state.filterVisible}
          searchForMatch={this.setNewFilter}
          sports={this.state.sports.map(
            sport => ({
              key: sport.id,
              text: sport.name,
              value: sport.id,
            })
          )}
        />
        <Table celled striped>



          <MatchesTable
            matches={this.state.matches}
            sports={this.state.sports}
            filterMatches={this.filterMatches}
          />


        </Table>
      </div>
    )
  }
};

export default Matches;
