import React, { Component } from "react";
import { Table, Icon } from 'semantic-ui-react'

import MatchesForm from './MatchesForm'

import './Matches.css'
import SportDetails from "../Sport-details/Sport-details";


const fetchMatches = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/matches.json");
    const matches = await response.json();
    return matches;
}

const fetchSports = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/sports.json");
    const sports = await response.json();
    return sports;
}

const fetchPlayers = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/players.json");
    const players = await response.json();
    return players;
}

const fetchUser = async () => {
    const response = await fetch(process.env.PUBLIC_URL + '/user.json')
    const user = await response.json()
    return user
}

class Matches extends Component {

    state = {
        matches: [],
        sports: [],
        players: [],
        user: [],
        filter: {
            location: '',
            sport: '',
        },
        filterVisible: false,
        clickedMatch: {}
    };

    componentDidMount() {
        Promise.all([fetchMatches(), fetchSports(), fetchPlayers(), fetchUser()])
            .then(([matches, sports, players, user]) => this.setState({
                matches: matches,
                sports: sports,
                players: players,
                user: user
            }))
    }



    setNewFilter = () => {
        const sport = document.querySelector('#matches-sports-select').childNodes[1].innerText !== 'Sport' ? document.querySelector('#matches-sports-select').childNodes[1].innerText : ''
        const location = document.querySelector('#form-input-control-location-matches').value

        this.setState({
            filter: {
                location: location,
                sport: sport,
            }
        })
        this.toggleFilter()
    }

    toggleFilter = () => {
        this.state.filterVisible ? this.setState({ filterVisible: false }) : this.setState({ filterVisible: true })
    }

    saveClickedMatchInfo = (match) => {
        this.setState({
            clickedMatch: this.state.matches.find(chosenMatch => chosenMatch.date === match.date)
        })
    }

    handleMatchClick = (e) => {
        const match = document.querySelector('.sport-details')
        const matchList = document.querySelector('.matches')

        if (match.style.display === 'none') {
            this.saveClickedMatchInfo(e)
            match.style.display = 'flex'
            matchList.style.display = 'none'
        } else {
            match.style.display = 'none'
            matchList.style.display = 'block'
        }
    }


    render() {

        return (
            <div className="componentWrapper">
                <SportDetails
                    toggleMatchView={this.handleMatchClick}
                    matches={this.state.clickedMatch}
                    players={this.state.players}
                    sports={this.state.sports}
                    user={this.state.user}
                />

                <div className="matches">
                    <MatchesForm
                        toggleFilter={this.toggleFilter}
                        filterStatus={this.state.filterVisible}
                        searchForMatch={this.setNewFilter}
                        sports={this.state.sports.map(
                            sport => ({
                                key: sport.id,
                                text: sport.name,
                                value: sport.name,
                            })
                        )}
                    />
                    <Table celled striped>


                        <Table.Body className="matches">
                            <Table.Header>
                                <Table.Row key="matches-header">
                                    <Table.HeaderCell>
                                        <Table.Cell >LOCATION</Table.Cell>
                                        <Table.Cell >SPORT</Table.Cell>
                                        <Table.Cell >DATE</Table.Cell>
                                        <Table.Cell >PLAYERS</Table.Cell>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {
                                this.state.matches
                                    .filter(
                                        match => (
                                            match.localization.city.toLowerCase().includes(this.state.filter.location.toLowerCase())
                                        ))
                                    .filter(
                                        match => (
                                            this.state.sports
                                                .filter(sport => match.sportID === sport.id)
                                                .map(sport => sport.name)
                                                .concat('')
                                        ).includes(this.state.filter.sport))
                                    .map(
                                        match => (
                                            <Table.Row key={match.id}>

                                                <Table.Cell>
                                                    <Table.Cell>{match.localization.city}
                                                    </Table.Cell>

                                                    <Table.Cell>{
                                                        this.state.sports
                                                            .filter(sport => match.sportID === sport.id)
                                                            .map(sport => `${sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}`)
                                                    }</Table.Cell>

                                                    <Table.Cell>
                                                        {match.date.day}
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        {match.playerIDs.map(
                                                            player => (
                                                                <Icon name="user" size="small"></Icon>
                                                            ))}
                                                    </Table.Cell>
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

export default Matches