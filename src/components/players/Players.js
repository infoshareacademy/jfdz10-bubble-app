import React, { Component } from "react";
import { Header, Image, Table, Button, Icon } from 'semantic-ui-react'

// import Player from './Player'



const fetchPlayers = () =>
    fetch(process.env.PUBLIC_URL + "/players.json").then(response =>
        response.json()
    );



class Players extends Component {

    state = {
        players: []
    };

    componentDidMount() {
        fetchPlayers().then(players => this.setState({ players }));
    }


    render() {
        
        return (

            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Player</Table.HeaderCell>
                        <Table.HeaderCell>Location</Table.HeaderCell>
                        <Table.HeaderCell>Sports</Table.HeaderCell>
                        <Table.HeaderCell>Add to Favorites</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.players.map(
                        player => (
                            <Table.Row>

                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={player.avatar} rounded size='mini' />
                                        <Header.Content>
                                            {player.name}
                                            <Header.Subheader>{player.eMail}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>

                                <Table.Cell>{player.localization}</Table.Cell>

                                <Table.Cell>{player.favouriteSportsIDs}</Table.Cell>

                                <Table.Cell>
                                    <Button icon>
                                        <Icon name='favorite' />
                                    </Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    )}

                </Table.Body>
            </Table>
        )
    }
}

export default Players