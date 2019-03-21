import React, { Component } from "react";
import { Header, Table, Button, Icon } from 'semantic-ui-react'

import PlayersForm from './PlayersForm'
import Player from '../player/Player'

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
        filter: {
            player: '',
            location: '',
            sport: '',
        },
        filterVisible: false,
        clickedPlayer: {}
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

    setNewFilter = () => {
        const sport = document.querySelector('#sports-select').childNodes[1].innerText !== 'Sport' ? document.querySelector('#sports-select').childNodes[1].innerText : ''
        const location = document.querySelector('#form-input-control-location').value
        const player = document.querySelector('#form-input-control-player').value

        this.setState({
            filter: {
                player: player,
                location: location,
                sport: sport,
            }
        })
        this.toggleFilter()
    }

    toggleFilter = () => {
        this.state.filterVisible ? this.setState({ filterVisible: false }) : this.setState({ filterVisible: true })
    }

    saveClickedPlayerInfo = (player) => {
        this.setState({
            clickedPlayer: this.state.players.find(chosenPlayer => chosenPlayer.id === player.id)
        })
    }

    handlePlayerClick = (e) => {
        const player = document.querySelector('.player')
        const playerList = document.querySelector('.players')

        if (player.style.display === 'none') {
            this.saveClickedPlayerInfo(e)
            player.style.display = 'flex'
            playerList.style.display = 'none'
        } else {
            player.style.display = 'none'
            playerList.style.display = 'block'
        }
    }
    render() {

        return (
            <div className="componentWrapper">
            <Player 
                togglePlayerView = {this.handlePlayerClick}
                players = {this.state.players}
            />
            <div className="players">

                <PlayersForm
                    toggleFilter={this.toggleFilter}
                    filterStatus={this.state.filterVisible}
                    searchForPlayer={this.setNewFilter}
                    sports={this.state.sports.map(
                        sport => ({
                            key: sport.id,
                            text: sport.name,
                            value: sport.name,
                        })
                    )}
                />
                <Table basic='very' celled>


                    <Table.Body>
                        {this.state.players
                            .filter(
                                player => (
                                    player.localization.toLowerCase().includes(this.state.filter.location.toLowerCase())
                                ))
                            .filter(
                                player => (
                                    player.name.toLowerCase().includes(this.state.filter.player.toLowerCase())
                                ))
                            .filter(
                                player => (
                                    this.state.sports
                                        .filter(sport => player.favouriteSportsIDs.includes(sport.id))
                                        .map(sport => sport.name)
                                        .concat('')
                                ).includes(this.state.filter.sport))
                            .map(
                                player => (
                                    <Table.Row key={player.id} className={this.compareFavPlayers().includes(player.id) ? "favorite-player player-row" : "player-row"}>

                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content className='player-name' onClick={() => this.handlePlayerClick(player)} >
                                                    {player.name.toUpperCase()}
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
                                            <Button icon
                                                onClick={() => this.saveUserFavPlayersInLocStorage(this, player.id)}>
                                                <Icon name='favorite' color={this.compareFavPlayers().includes(player.id) ? "yellow" : ""}  />  {this.compareFavPlayers().includes(player.id) ? "Remove From" : "Add To"} Favorites
                                    </Button>
                                        </Table.Cell>

                                    </Table.Row>
                                )
                            )}

                    </Table.Body>
                </Table>
            </div>
            </div>
        )
    }
}

export default Players