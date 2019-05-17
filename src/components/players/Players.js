import React, { Component } from "react";
import { Table } from 'semantic-ui-react'
import PlayersForm from './PlayersForm'
import Player from '../player/Player'
import PlayerTable from './PlayerTable'

import firebase from 'firebase'

import './Players.css'




class Players extends Component {

    state = {
        players: [],
        sports: [],
        user: {},
        filter: {
            player: '',
            location: '',
            sports: [],
            isEmpty: false,
        },
        filterVisible: false,
        clickedPlayer: {},
        refs: [],
    };

    componentDidMount() {
        this.getSports()
        this.getPlayers()

        const ref = firebase.auth().onAuthStateChanged(user =>
            user
                ? firebase.database().ref('players/' + user.uid).on('value',
                    snapshot => this.setState({
                        user: snapshot.val()
                    }))

                : ''
        )

        this.setState({
            ref
        })
    }

    componentWillUnmount() {

        this.state.ref && this.state.ref();
        this.state.refs.forEach(ref => ref.off());
    }


    getSports = () => {
        const sportsRef = firebase.database().ref('sports');

        sportsRef.on('value',

            snapshot => {
                this.setState({
                    sports: snapshot.val()
                })
            });

        const newRefs = [sportsRef, ...this.state.refs];
        this.setState({
            refs: newRefs
        })
    }

    getPlayers = () => {
        const playersRef = firebase.database().ref('players');
        playersRef.on('value', (snapshot) => {
            const players = snapshot.val();
            const playersArray = Object.keys(players).map(key => ({
                id: key,
                ...players[key]
            }));

            this.setState({
                players: playersArray
            })
        })
    };


    addFavoritePlayer = (playerID) => {
        let favPlayers = []
        if (this.state.user.favouritePlayersIDs) {
            !this.state.user.favouritePlayersIDs.includes(playerID)
                ?
                favPlayers = [...this.state.user.favouritePlayersIDs, playerID]
                :
                favPlayers = this.state.user.favouritePlayersIDs.filter(favPlayer => (
                    favPlayer !== playerID
                ))

        } else {
            favPlayers = [playerID]
        }

        firebase.database().ref('players/' + this.state.user.id).set({
            ...this.state.user,
            favouritePlayersIDs: favPlayers
        });
    }


    setNewFilter = (playerReceived, locationReceived, sportReceived) => {

        this.setState({
            filter: {
                player: playerReceived,
                location: locationReceived,
                sports: sportReceived,
            }
        })
        this.toggleFilter();
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


    filterPlayers = (players) => {
        return players.filter(
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
                        .filter(sport => (player.favouriteSportsIDs || []).includes(sport.id) || [])
                ).some(sport => (this.state.filter.sports).includes(sport.id)) || this.state.filter.sports[0] === undefined)
    }


    render() {

        return (
            <div className="componentWrapper">
                <Player
                    togglePlayerView={this.handlePlayerClick}
                    player={this.state.clickedPlayer}
                    players={this.state.players}
                    sports={this.state.sports}
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
                                value: sport.id,
                            })
                        )}
                    />
                    <Table basic='very' celled>

                        <PlayerTable
                            filterPlayers={this.filterPlayers}
                            favPlayers={this.state.user.favouritePlayersIDs || []}
                            saveUserFavPlayersInLocStorage={this.saveUserFavPlayersInLocStorage}
                            sports={this.state.sports}
                            players={this.state.players}
                            handlePlayerClick={this.handlePlayerClick}
                            addFavoritePlayer={this.addFavoritePlayer}
                        />

                    </Table>
                </div>
            </div>
        )
    }
}

export default Players