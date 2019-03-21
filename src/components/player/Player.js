import React, { Component } from 'react'
import './Player.css'


class Player extends Component {
    
    render() {
        return(
            <div className='player' style={{display: 'none'}}>
                Hello
                {console.log(this.props.player)}
                <button className='toggle-view-button' onClick={() => {this.props.togglePlayerView()}}>X</button>
                <div className='Profile'>
                <div className='ProfileDetails'>
                    <header>
                        <ul className="ProfileHeader">
                            <li>Profile Details</li>
                        </ul>    
                    </header>
                    <div>
                        <ul className="DetailsList">
                            <li className='DetailsListContainer'>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Avatar:</dt>
                                    <dd className="Item"><div className='Avatar' style={{backgroundImage: `url(${this.props.player.avatar})`}}></div></dd>
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
                                    <dt className="ItemDescription">Localization:</dt>
                                    <dd className="Item">{this.props.player.localization}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="FavouriteSports">
                    <header>
                        <ul className="ProfileHeader">
                            <li>Favourite Sports</li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.props.sports
                            .filter(sport => sport.id === this.props.player.favouriteSportsIDs.find(id => id === sport.id))
                            .map(sport => (
                                <li className="FavouriteSportsListItem" key={sport.id}>{sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}</li>
                            ))}
                    </ol>
                </div>
                <div className="FavouritePlayers">
                    <header>
                        <ul className="ProfileHeader">
                            <li>Favourite Players</li>
                            <li><button className="EditButton">Edit</button></li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.props.players
                            .filter(player => player.id === this.props.player.favouritePlayersIDs.find(id => id === player.id))
                            .map(player => (
                                <li className="FavouriteSportsListItem" key={player.id}>{player.name}</li>
                            ))}
                    </ol>
                </div>
            </div>
            </div>
        )
    }
}

export default Player