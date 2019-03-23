import React, { Component, Fragment }  from "react";

import { Form, Input, Button, Select, Segment, Header, Icon } from 'semantic-ui-react'

class PlayersForm extends Component {

        
    render() {

        return (
            <Fragment>
                <div onClick={this.props.toggleFilter} className="top-header">
                    <Header as='h5' icon textAlign='center'>
                        <Icon size="small" name='search' circular inverted color='#B03060'/>
                    </Header>
                </div>
            <Segment inverted style={(this.props.filterStatus) ? {display: "block"} : {display: "none"}}>
                <Form className="players-search-form-visible" >
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
            </Fragment>
        )

    }
}

export default PlayersForm