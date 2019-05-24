import React, { Component } from "react";
import { Table } from 'semantic-ui-react'

import MatchesForm from './MatchesForm'
import MatchesTable from './MatchesTable'

import './Matches.css'
import firebase from 'firebase'


class Matches extends Component {

    state = {
        matches: [],
        sports: [],
        filter: {
            location: '',
            sports: [],
        },
        filterVisible: false,
        refs: []
    };

    componentDidMount() {        
        this.getMatches()
        this.getSports()
    }
    
    componentWillUnmount() {
        this.state.refs.forEach(ref => ref.off());
    }

    getMatches = () => {
        const matchesRef = firebase.database().ref('matches');
        matchesRef.on('value', (snapshot) => {
            const matches = snapshot.val();
            const matchesArray = Object.keys(matches).map(key => ({
                id: key,
                ...matches[key]
            }));

            this.setState({
                matches: matchesArray
            })
        })
        const newRefs = [matchesRef, ...this.state.refs];
        this.setState({
            refs: newRefs
        })
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