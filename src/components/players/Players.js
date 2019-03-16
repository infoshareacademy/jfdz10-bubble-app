import React, { Component } from "react";
import { Header, Table, Button, Icon } from 'semantic-ui-react'

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


const fetchUsersFavorites = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/user.json");
    const user = await response.json();
    return user.favouritePlayersIDs;
}



class Players extends Component {

    state = {
        players: [],
        sports: [],
        user: {},
        favoritePlayers: [],
    };

    componentDidMount() {
        Promise.all([fetchPlayers(), fetchSports(), fetchUser(), fetchUsersFavorites()])
            .then(([players, sports, user, favPlayers]) => this.setState({
                players: players,
                sports: sports,
                user: user,
                favoritePlayers: favPlayers,
            }))
            

    }

    compareFavPlayers = () => {
        let favoritePlayersAsIs = this.state.user.favouritePlayersIDs;
        let usersFromLocStorage = JSON.parse(localStorage.getItem('favPlayersNoDups'));
        return usersFromLocStorage || favoritePlayersAsIs;
    }

    saveUserFavPlayersInLocStorage = (component, addedPlayer) => {
        let favouritePlayers = this.compareFavPlayers();
        let favPlayersNoDups = [];

        favouritePlayers.includes(addedPlayer) ? favouritePlayers.splice((favouritePlayers.indexOf(addedPlayer)), 1) : favouritePlayers.push(addedPlayer);
        favPlayersNoDups = favouritePlayers.filter((item, pos, self) => self.indexOf(item) === pos)

        localStorage.setItem('favPlayersNoDups', JSON.stringify(favPlayersNoDups));

        this.setState({ favoritePlayers: favPlayersNoDups })
        return favPlayersNoDups;
    }


    render() {
        

        return (


            <Table basic='very' celled>
                <Table.Header className="player-row">
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
                            <Table.Row key={player.id} className={this.state.favoritePlayers.includes(player.id) ? "favorite-player player-row" : "player-row"}>

                                <Table.Cell>
                                    <Header as='h4' image>
                                        {/* <Image src={player.avatar} rounded size='mini' /> */}
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
                                    <Button icon onClick={() => this.saveUserFavPlayersInLocStorage(this, player.id)}>
                                        <Icon name='favorite' />  Add to Favorites
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