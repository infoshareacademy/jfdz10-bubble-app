import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { List } from "semantic-ui-react";

class SportDetails extends Component {

  render() {

    return (
      <div className='sport-details' style={{ display: 'none' }}>
        <div>

        </div>
        <Grid stackable columns={2}>
          <Grid.Column>
            <button className='toggle-view-button' onClick={() => { this.props.toggleMatchView() }}>X</button>
            <Segment>
              <List>
                <List.Item>
                  <List.Header>Sport</List.Header>
                  {/* {
                    this.props.matches
                      .filter(
                        match => (
                          this.props.sports
                            .filter(sport => match.sportID === sport.id)
                            .map(sport => sport.name)
                            .concat(''))
                          .includes(this.props.filter.sport))
                  } */}
                </List.Item>
                <List.Item>
                  <List.Header>Adress</List.Header>
                  <li>{this.props.matches.localization ? this.props.matches.localization.city : null}</li>
                </List.Item>
                <List.Item>
                  <List.Header>Date of event</List.Header>
                  <li>{this.props.matches.date ? this.props.matches.date.day : null}</li>
                </List.Item>
                <List.Item>
                  <List.Header>Time of event</List.Header>
                  <li>{this.props.matches.date ? this.props.matches.date.hour : null}</li>
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
                    <li key={this.props.matches.playerIDs}>{this.props.matches.playerIDs}</li>
                  </ul>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <List.Header>Host comment:</List.Header>
              <p key={this.props.matches.comment}>{this.props.matches.comment}</p>
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
