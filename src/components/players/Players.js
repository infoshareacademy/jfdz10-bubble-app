import React, { Component } from "react";
import { Header, Image, Table, Button, Icon } from 'semantic-ui-react'

import './Players.css'


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


const fetchUser = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/user.json");
    const user = await response.json();
    return user;
}



class Players extends Component {

    state = {
        players: [],
        sports: [],
        user: {},
    };

    componentDidMount() {
        Promise.all([fetchPlayers(), fetchSports(), fetchUser()])
            .then(([players, sports, user]) => this.setState({
                players: players,
                sports: sports,
                user: user,
            }))
    }

    getUserFavPlayers = () => {
        return this.state.user.favouritePlayersIDs;
    }

    compareFavPlayers = () => {
        let favoritePlayersAsIs = this.getUserFavPlayers();
        let usersFromLocStorage = JSON.parse(localStorage.getItem('favPlayersNoDups'));
        return usersFromLocStorage || favoritePlayersAsIs;       
    }


    saveUserFavPlayersInLocStorage = (addedPlayer) => {        
        let favouritePlayers = this.compareFavPlayers();
        let favPlayersNoDups = [];


        favouritePlayers.push(addedPlayer)
        favPlayersNoDups = favouritePlayers.filter((item, pos, self) => self.indexOf(item) === pos)
    
        localStorage.setItem('favPlayersNoDups', JSON.stringify(favPlayersNoDups));
    }
    

    render() {

        return (

            <Table basic='very' celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Player</Table.HeaderCell>
                        <Table.HeaderCell>Location</Table.HeaderCell>
                        <Table.HeaderCell>Sports</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.players.map(
                        player => (
                            <Table.Row key={player.id} className={this.compareFavPlayers().includes(player.id) ? "favorite-player" : ""}>

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
                                        .map(sport => `${sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}; `)
                                }</Table.Cell>


                                <Table.Cell>
                                    <Button icon>
                                        <Icon name='favorite' onClick={() => this.saveUserFavPlayersInLocStorage(player.id)} />  Add to Favorites
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