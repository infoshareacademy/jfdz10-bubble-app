import React, { Component } from 'react'
import firebase from 'firebase'
import './Profile.css'

const fetchUser = async () => {
    const response = await fetch(process.env.PUBLIC_URL + '/user.json')
    const user = await response.json()
    return user
}

class Profile extends Component {
    state = {
        user : {},
        sports: [],
        players: [],
        refs: []
    }

    componentDidMount() {
        this.getSports()
        this.getPlayers()

        Promise.all([fetchUser()])
        .then(([user]) => this.setState({
            user: user,
            
            })
        )
    }

     
    componentWillUnmount() {
        this.state.refs.forEach(ref => ref.off());
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

    getPlayers = () => {
        const playersRef = firebase.database().ref('players');

        playersRef.on('value',
            snapshot => {
                this.setState({
                    players: snapshot.val()
                })
            });

        const newRefs = [playersRef, ...this.state.refs];
        this.setState({
            refs: newRefs
        })
    }


    render() { 
        return (
            <div className='Profile'>
                <div className='ProfileDetails'>
                    <header>
                        <ul className="ProfileHeader">
                            <li>Profile Details</li>
                            <li><button className='EditButton'>Edit</button></li>
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
                                    <dt className="ItemDescription">Location:</dt>
                                    <dd className="Item">{this.state.user.localization}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="FavouriteSports">
                    <header>
                        <ul className="ProfileHeader">
                            <li>Favorite Sports</li>
                            <li><button className="EditButton">Edit</button></li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.state.sports
                            // .filter(sport => sport.id === this.state.user.favouriteSportsIDs.find(id => id === sport.id) )
                            .filter(sport => this.state.user.favouriteSportsIDs.includes(sport.id) || [])
                            .map(sport => (
                                <li className="FavouriteSportsListItem" key={sport.id}>{sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}</li>
                            ))}
                    </ol>
                </div>
                <div className="FavouritePlayers">
                    <header>
                        <ul className="ProfileHeader">
                            <li>Favorite Players</li>
                            <li><button className="EditButton">Edit</button></li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.state.players
                            // .filter(player => player.id === this.state.user.favouritePlayersIDs.find(id => id === player.id) || [])
                            .filter(player => this.state.user.favouritePlayersIDs.includes(player.id) || [])
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