import React, { Component } from 'react'
import './Player.css'


class Player extends Component {
    
    render() {
        return(
            <div className='player' style={{display: 'none'}}>
                
                <div className='Profile'>
                <div className='ProfileDetails'>
                    <header>
                        <ul className="ProfileHeader">
                            <li>Profile Details</li>
                            <button className='toggle-view-button' onClick={() => {this.props.togglePlayerView()}}>X</button>
                        </ul>    
                    </header>
                    <div>
                        <ul className="DetailsList">
                            <li className='DetailsListContainer'>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Avatar:</dt>
                                    <dd className="Item AvatarContainer"><div className='Avatar' style={{backgroundImage: `url(${this.props.player.avatar})`}}></div></dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Username:</dt>
                                    <dd className="Item">{this.props.player.name}</dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Email:</dt>
                                    <dd className="Item">{this.props.player.eMail}</dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Joined:</dt>
                                    <dd className="Item">{this.props.player.dateOfJoining}</dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Location:</dt>
                                    <dd className="Item">{this.props.player.localization}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
            </div>
        )
    }
}

export default Player