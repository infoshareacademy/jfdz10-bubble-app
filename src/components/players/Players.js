import React, { Component } from "react";
import { Header, Image, Table, Button, Icon } from 'semantic-ui-react'




// const fetchPlayers = () =>
//     fetch(process.env.PUBLIC_URL + "/players.json")
//         .then(response => response.json());

const fetchPlayers = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/players.json");
    const players = await response.json();
    return players;
}

const fetchSports = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/sports.json");
    const sports = await response.json();
    return sports;
}



class Players extends Component {

    state = {
        players: [],
        sports: [],
    };

    componentDidMount() {
        Promise.all([fetchPlayers(), fetchSports()])
            .then(([players, sports]) => this.setState({
                players: players,
                sports: sports
            }))
        // .then(() => console.log(this.state.sports, 'dupa'))

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

                               

                                <Table.Cell>{
                                    this.state.sports
                                        .filter(sport => player.favouriteSportsIDs.includes(sport.id))
                                        .map(sport => `${sport.name}; `)                                    
                                }</Table.Cell>


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