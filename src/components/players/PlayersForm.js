import React, { Component } from "react";

import { Form, Input, Button, Select, Segment } from 'semantic-ui-react'

class PlayersForm extends Component {


    render() {

        return (
            <Segment inverted>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-player'
                            control={Input}
                            placeholder='Player'

                        />
                        <Form.Field
                            id='form-input-control-location'
                            control={Input}
                            placeholder='Location'

                        />
                        <Form.Field
                            id='sports-select'
                            control={Select}
                            options={this.props.sports}
                            placeholder='Sport'
                            search
                            searchInput={{ id: 'form-select-control-sports' }}

                        />
                    </Form.Group>

                    <Form.Field fluid
                        onClick={this.props.searchForPlayer}
                        id='form-button-control-public'
                        control={Button}
                        content='Search'
                    />
                </Form>
            </Segment>
        )

    }
}

export default PlayersForm