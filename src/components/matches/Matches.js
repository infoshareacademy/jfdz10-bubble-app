import React, { Component } from "react";
import { Header, Table} from 'semantic-ui-react'

import MatchesForm from './MatchesForm'

// import './Players.css'


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
            match: '',
            location: '',
            sport: '',
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

   

    setNewFilter = () => {
        const sport = document.querySelector('#sports-select').childNodes[1].innerText !== 'Sport' ? document.querySelector('#sports-select').childNodes[1].innerText : ''
        const location = document.querySelector('#form-input-control-location').value
        const match = document.querySelector('#form-input-control-match').value

        this.setState({
            filter: {
                match: match,
                location: location,
                sport: sport,
            }
        })
        this.toggleFilter()
    }

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
                            value: sport.name,
                        })
                    )}
                />
                <Table celled padded>


                    <Table.Body>
                        {
                            this.state.matches
                            .filter(
                                match => (
                                    match.localization.city.toLowerCase().includes(this.state.filter.location.toLowerCase())
                                ))
                            
                            .map(
                                match => (
                                    <Table.Row key={match.id}>

                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>
                                                    {match.hostid}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>

                                        <Table.Cell>{match.localization.city}</Table.Cell>



                                        <Table.Cell>{
                                            this.state.sports
                                                .filter(sport => match.sportID === sport.id)
                                                .map(sport => `${sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}`)
                                        }</Table.Cell>


                                        <Table.Cell>
                                            {match.date.day}
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