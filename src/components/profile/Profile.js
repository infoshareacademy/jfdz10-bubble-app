import React, { Component } from 'react'
import './Profile.css'

const fetchUser = async () => {
    const response = await fetch(process.env.PUBLIC_URL + '/user.json')
    const user = await response.json()
    return user
}

const fetchSports = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/sports.json");
    const sports = await response.json();
    return sports;
}

const fetchPlayers = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/players.json");
    const players = await response.json();
    return players;
}
class Profile extends Component {
    state = {
        user : {},
        sports: [],
        players: []
    }

    componentDidMount() {
        Promise.all([fetchUser(), fetchSports(), fetchPlayers()])
        .then(([user, sports, players]) => this.setState({
            user: user,
            sports: sports,
            players: players
            })
        )
    }

    render() { 
        return (
            <div className='Profile'>
                <div className='ProfileDetails'>
                    <header>
                        <ul className="ProfileHeader">
                            <li>Profile Details</li>
                            <li><button>Edit</button></li>
                        </ul>    
                    </header>
                    <div>
                        <ul className="DetailsList">
                            <li className='DetailsListContainer'>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Avatar:</dt>
                                    <dd className="Item"><div className='Avatar' style={{backgroundImage: `url(${this.state.user.avatar})`}}></div></dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Username:</dt>
                                    <dd className="Item">{this.state.user.name}</dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Email:</dt>
                                    <dd className="Item">{this.state.user.eMail}</dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Joined:</dt>
                                    <dd className="Item">{this.state.user.dateOfJoining}</dd>
                                </dl>
                                <dl className='ProfileDetailsListItem'>
                                    <dt className="ItemDescription">Localization:</dt>
                                    <dd className="Item">{this.state.user.localization}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="FavouriteSports">
                    <header>
                        <ul className="ProfileHeader">
                            <li>Favourite Sports</li>
                            <li><button>Edit</button></li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.state.sports
                            .filter(sport => sport.id === this.state.user.favouriteSportsIDs.find(id => id === sport.id))
                            .map(sport => (
                                <li className="FavouriteSportsListItem" key={sport.id}>{sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}</li>
                            ))}
                    </ol>
                </div>
                <div className="FavouritePlayers">
                    <header>
                        <ul className="ProfileHeader">
                            <li>Favourite Players</li>
                            <li><button>Edit</button></li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.state.players
                            .filter(player => player.id === this.state.user.favouritePlayersIDs.find(id => id === player.id))
                            .map(player => (
                                <li className="FavouriteSportsListItem" key={player.id}>{player.name}</li>
                            ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Profile