import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { List } from "semantic-ui-react";

class SportDetails extends Component {

  //AddPlayerToEvent = () => { }

  render() {

    return (
      <div className='sport-details' style={{ display: 'none' }}>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment>
              <List>
                <List.Item>
                  <List.Header>Sport</List.Header>{}
                </List.Item>
                <List.Item>
                  <List.Header>Adress</List.Header>
                  {this.props.clickedMatch.map((match) => <li key={match.localization.street}>{this.props.localization.city}</li>)}
                </List.Item>
                <List.Item>
                  <List.Header>Date of event</List.Header>
                  {this.props.matches.map((match) => <li key={match.date.day}>{this.props.date.day}</li>)}
                </List.Item>
                <List.Item>
                  <List.Header>Time of event</List.Header>
                  {this.props.matches.map((match) => <li key={match.date.hour}>{this.props.date.hour}</li>)}
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <List>
                <List.Item>
                  <List.Header>Host</List.Header>
                  {this.props.user.name}
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
      </div>
    );
  }
}
export default SportDetails;
