import React, { Component } from 'react'
import './Player.css'


class Player extends Component {
    
    render() {
        return(
            <div className='player' style={{display: 'none'}}>
                Hello
                <button className='toggle-view-button' onClick={() => {this.props.togglePlayerView()}}>X</button>
            </div>
        )
    }
}

export default Player