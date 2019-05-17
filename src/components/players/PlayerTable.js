import React from 'react'
import EmptyFilter from '../assets/EmptyFilter/EmptyFilter'
import { Header, Table, Button, Icon } from 'semantic-ui-react'


const PlayerTable = (props) => {
    return (
        
        <Table.Body>
            { (props.filterPlayers(props.players).length > 0) ? (props.filterPlayers(props.players)
                .map(
                    player => (
                        <Table.Row key={player.id} className={props.favPlayers.includes(player.id) ? "favorite-player player-row" : "player-row"}>

                            <Table.Cell>
                                <Header as='h4' image>
                                    <Header.Content className='player-name'>
                                        {player.name.toUpperCase()}
                                        <Header.Subheader>{player.eMail}</Header.Subheader>
                                        <Header.Subheader><Button style={{margin: "5px"}} onClick={() => props.handlePlayerClick(player)}>More</Button></Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>

                            <Table.Cell>{player.localization}</Table.Cell>

                            <Table.Cell>{
                                props.sports
                                    .filter(sport => (player.favouriteSportsIDs || []).includes(sport.id))
                                    .map(sport => `${sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}`)
                                    .concat('')
                                    .join(' ')
                                    .slice(0, -1)
                            }</Table.Cell>


                            <Table.Cell>
                                <Button icon
                                    onClick={() => props.addFavoritePlayer(player.id)}>
                                    <Icon name='favorite' color={props.favPlayers.includes(player.id) ? "yellow" : "grey"} />  {props.favPlayers.includes(player.id) ? "Remove From" : "Add To"} Favorites
                                    </Button>
                            </Table.Cell>

                        </Table.Row>
                    )
                )) : (<EmptyFilter />)
            } 

        </Table.Body>
    )
}

export default PlayerTable