import React, { Fragment } from 'react'
import EmptyFilter from '../assets/EmptyFilter/EmptyFilter'

import { Table, Icon } from 'semantic-ui-react'

const MatchesTable = (props) => {
    return (
        <Table.Body className="matches">
        {props.filterMatches(props.matches).length > 0 
        ?
        <Fragment>
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
        props.filterMatches(props.matches)
            .map(
                match => (
                    (<Table.Row key={match.id}>

                        <Table.Cell>
                            <Table.Cell>{match.localization.city}
                            </Table.Cell>

                            <Table.Cell>{
                                props.sports
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

                    </Table.Row>)

                )
            )
    }
</Fragment>
    :
    <EmptyFilter />}
    </Table.Body>
    
    )
    

}

export default MatchesTable