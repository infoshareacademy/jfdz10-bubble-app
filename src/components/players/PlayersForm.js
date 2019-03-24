import React, { Component, Fragment } from "react";

import { Form, Input, Button, Select, Segment, Header, Icon } from 'semantic-ui-react'

class PlayersForm extends Component {

    state = {
        player: '',
        location: '',
        sports: '',
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    render() {

        return (
            <Fragment>
                <div onClick={this.props.toggleFilter} className="top-header">
                    <Header as='h5' icon textAlign='center'>
                        <Icon size="small" name='search' circular inverted color='black' />
                    </Header>
                </div>
                <Segment inverted style={(this.props.filterStatus) ? { display: "block" } : { display: "none" }}>
                    <Form className="players-search-form-visible" >
                        <Form.Group widths='equal'>
                            <Form.Field
                                name="player"
                                id='form-input-control-player'
                                control={Input}
                                placeholder='Player'
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                name="location"
                                id='form-input-control-location'
                                control={Input}
                                placeholder='Location'
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                name="sports"
                                multiple selection
                                id='sports-select'
                                control={Select}
                                options={this.props.sports}
                                placeholder='Sport'
                                search
                                searchInput={{ id: 'form-select-control-sports' }}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Field fluid
                            onClick={() => this.props.searchForPlayer(this.state.player, this.state.location, this.state.sports)}

                            id='form-button-control-public'
                            control={Button}
                            content='Search'
                        />
                    </Form>
                </Segment>
            </Fragment>
        )

    }
}

export default PlayersForm