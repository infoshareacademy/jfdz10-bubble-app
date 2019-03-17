import React, { Component } from "react";
//import ReactDOM from "react-dom";
// import { ReactComponent } from '*.svg';
import { Grid, Segment } from "semantic-ui-react";
import { List } from "semantic-ui-react";

class SportDetails extends Component {
  render() {
    return (
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <List>
              <List.Item>
                <List.Header>Sport</List.Header>A lovely city
              </List.Item>
              <List.Item>
                <List.Header>Adress</List.Header>
                Also quite a lovely city
              </List.Item>
              <List.Item>
                <List.Header>Date of event</List.Header>
                Sometimes can be a lovely city
              </List.Item>
              <List.Item>
                <List.Header>Time of event</List.Header>
                What a lovely city
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>MAPA</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>lorem</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>Komentarz hosta</p>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default SportDetails;
