import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { ReactComponent } from '*.svg';
import { Grid, Image, Segment } from 'semantic-ui-react'

class SportDetails extends Component{
    render() {return (
  <Grid stackable columns={2}>
    <Grid.Column>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
        <p>lorem</p>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
        <p>lorem</p>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
        <p>lorem</p>
      </Segment>
    </Grid.Column>
  </Grid>
)
    }
}
export default SportDetails;
