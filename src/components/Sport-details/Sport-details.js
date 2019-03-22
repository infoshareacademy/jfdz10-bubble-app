import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { ReactComponent } from '*.svg';
import { Grid, Segment } from "semantic-ui-react";
import { List } from "semantic-ui-react";


const fetchPlayers = async () => {
  const response = await fetch(process.env.PUBLIC_URL + "/players.json");
  const players = await response.json();
  return players;
}

const fetchUser = async () => {
  const response = await fetch(process.env.PUBLIC_URL + '/user.json')
  const user = await response.json()
  return user
}

const fetchSports = async () => {
  const response = await fetch(process.env.PUBLIC_URL + "/sports.json");
  const sports = await response.json();
  return sports;
}

const fetchMatches = async () => {
  const response = await fetch(process.env.PUBLIC_URL + "/matches.json");
  const matches = await response.json();
  return matches;
}

class SportDetails extends Component {

  state = {
    players: [],
    user: [],
    sports: [],
    matches: []

  }

  componentDidMount() {
    Promise.all([fetchUser(), fetchSports(), fetchPlayers(), fetchMatches()])
      .then(([user, sports, players, matches]) => this.setState({
        user: user,
        sports: sports,
        players: players,
        matches: matches
      })
      )
  }

  //AddPlayerToEvent = () => { }

  render() {

    return (
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <List>
              <List.Item>
                <List.Header>Sport</List.Header>{}
              </List.Item>
              <List.Item>
                <List.Header>Adress</List.Header>
                {this.state.matches.map((match) => <li key={match.localization.street}>{match.localization.city}</li>)}
              </List.Item>
              <List.Item>
                <List.Header>Date of event</List.Header>
                {this.state.matches.map((match) => <li key={match.date.day}>{match.date.day}</li>)}
              </List.Item>
              <List.Item>
                <List.Header>Time of event</List.Header>
                {this.state.matches.map((match) => <li key={match.date.hour}>{match.date.hour}</li>)}
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <List>
              <List.Item>
                <List.Header>Host</List.Header>
                {this.state.user.name}
              </List.Item>
              <List.Item>
                <List.Header>Contestants:</List.Header>
                <ul>
                  {this.state.players.map((player) => <li key={player.name}>{player.name}</li>)}
                </ul>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <List.Header>Info:</List.Header>
            {this.state.matches.map((match) => <p key={match.comment}>{match.comment}</p>)}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <div>Google MAP</div>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <button onClick={this.AddPlayerToEvent}>Join event</button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default SportDetails;
