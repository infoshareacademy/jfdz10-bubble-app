import React, { Component } from 'react'
import './Player.css'

const fetchPlayers = async () => {
    const response = await fetch(process.env.PUBLIC_URL + '/players.json')
    const players = await response.json()

    return players
}


class Player extends Component {
    state = {
        players : []
    }

    componentDidMount() {
        Promise.all([fetchPlayers()]).then(players => this.setState({
            players: players
        })
        )
    }

    render() {
        return(
            <div className='player'>
                {console.log(this.state.players)}
                Hello
            </div>
        )
    }
}

export default Player