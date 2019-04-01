import React, { Component } from "react";
import { Table, Icon } from 'semantic-ui-react'

import MatchesForm from './MatchesForm'
import EmptyFilter from '../assets/EmptyFilter/EmptyFilter'
import MatchesTable from './MatchesTable'

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

    toggleFilter = () => {
        this.state.filterVisible ? this.setState({ filterVisible: false }) : this.setState({ filterVisible: true })
    }

    filterMatches = (matches) => {
        return matches.filter(
            match => (
                match.localization.city.toLowerCase().includes(this.state.filter.location.toLowerCase())
            ))
            .filter(
                match => (
                    this.state.sports
                        .filter(sport => match.sportID === sport.id)
                ).some(sport => (this.state.filter.sports).includes(sport.id)) || this.state.filter.sports[0] === undefined)
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


                    
                        <MatchesTable
                            matches={this.state.matches}
                            sports={this.state.sports}
                            filterMatches={this.filterMatches}
                        />

                    
                </Table>
            </div>
        )
    }
}

export default Matches