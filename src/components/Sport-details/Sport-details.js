import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import "./Sport-details.css";

class SportDetails extends Component {

  // AddPlayerToEvent = (e) => {
  //   const userName = this.props.user.name;

  // }

  render() {

    // console.log(this.props);
    const playerIDs = this.props.match.playerIDs;
    const sportID = this.props.match.sportID;
    let matchPlayers;
    let sportName;

    if (playerIDs) {
      matchPlayers = this.props.players.filter(player =>
        playerIDs.includes(player.id)
      );
    }

    if (sportID) {
      sportName = this.props.sports.filter(sport =>
        sportID === sport.id)
    }

    return (
      <div className="sport-details" style={{ display: "none" }}>
        <Grid stackable columns={2}>
          <Grid.Column>
            <button
              id="button"
              onClick={() => {
                this.props.toggleMatchView();
              }}
            >
              Back
            </button>
            <Segment>
              <List>
                <List.Item>
                  <List.Header className='header'>Sport</List.Header>
                  {sportName &&
                    sportName.map(sport => {
                      return <li key={sport.id}>{sport.name}</li>;
                    })}
                </List.Item>
                <List.Item>
                  <List.Header className='header'>Address</List.Header>
                  <li>
                    {this.props.match.localization
                      ? this.props.match.localization.city
                      : null}
                  </li>
                </List.Item>
                <List.Item>
                  <List.Header className='header'>Date of event</List.Header>
                  <li>
                    {this.props.match.date ? this.props.match.date.day : null}
                  </li>
                </List.Item>
                <List.Item>
                  <List.Header className='header'>Time of event</List.Header>
                  <li>
                    {this.props.match.date ? this.props.match.date.hour : null}
                  </li>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <List>
                <List.Item>
                  <List.Header className='header'>Host</List.Header>
                  <li id='player-info'>{this.props.user.name}</li>
                </List.Item>
                <List.Item>
                  <List.Header className='header'>Players</List.Header>
                  <ul>
                    {matchPlayers &&
                      matchPlayers.map(player => {
                        return <li id='player-info' key={player.id}>{player.name}</li>;
                      })}
                  </ul>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <List>
                <List.Item>
                  <List.Header className='header'>Host comment</List.Header>
                  <p key={this.props.match.comment}>{this.props.match.comment}</p>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <button id='button' onClick={this.AddPlayerToEvent}>Join event</button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default SportDetails;
