import React, { Component } from "react";
import { Table, Icon } from 'semantic-ui-react'

import MatchesForm from './MatchesForm'

import './Matches.css'


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


class Matches extends Component {

    state = {
        matches: [],
        sports: [],
        filter: {
            location: '',
            sports: [],
        },
        filterVisible: false,
    };

    componentDidMount() {
        Promise.all([fetchMatches(), fetchSports()])
            .then(([matches, sports]) => this.setState({
                matches: matches,
                sports: sports,
            }))
    }

    setNewFilter = (locationReceived, sportReceived) => {
        
        this.setState({
            filter: {  
                location: locationReceived,
                sports: sportReceived,
            }
        })
        this.toggleFilter()
    }


    // setNewFilter = () => {
    //     const sport = document.querySelector('#matches-sports-select').childNodes[1].innerText !== 'Sport' ? document.querySelector('#matches-sports-select').childNodes[1].innerText : ''
    //     const location = document.querySelector('#form-input-control-location-matches').value
        
    //     this.setState({
    //         filter: {
    //             location: location,
    //             sport: sport,
    //         }
    //     })
    //     this.toggleFilter()
    // }

    toggleFilter = () => {
        this.state.filterVisible ? this.setState({ filterVisible: false }) : this.setState({ filterVisible: true })
    }


    render() {

        return (
            <div>

                <MatchesForm
                    toggleFilter={this.toggleFilter}
                    filterStatus={this.state.filterVisible}
                    searchForMatch={this.setNewFilter}
                    sports={this.state.sports.map(
                        sport => ({
                            key: sport.id,
                            text: sport.name,
                            value: sport.id,
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
                                    ).some(sport => (this.state.filter.sports).includes(sport.id))  || this.state.filter.sports[0] === undefined)
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
        )
    }
}

export default Matches