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

class Profile extends Component {
    state = {
        user : {},
        sports: []
    }

    componentDidMount() {
        Promise.all([fetchUser(), fetchSports()])
        .then(([user, sports]) => this.setState({
            user: user,
            sports: sports
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
                        <ul className='ProfileDetails'>
                            <li >
                                <dl>
                                    <dt className="ItemDescription">Avatar:</dt>
                                    <dd className="Item"><div className='Avatar' style={{backgroundImage: `url(${this.state.user.avatar})`}}></div></dd>
                                </dl>
                                <dl>
                                    <dt className="ItemDescription">Username:</dt>
                                    <dd className="Item">{this.state.user.name}</dd>
                                </dl>
                                <dl>
                                    <dt className="ItemDescription">Email:</dt>
                                    <dd className="Item">{this.state.user.eMail}</dd>
                                </dl>
                                <dl>
                                    <dt className="ItemDescription">Joined:</dt>
                                    <dd className="Item">{this.state.user.dateOfJoining}</dd>
                                </dl>
                                <dl>
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
                    <ul className="FavouriteSportsList">
                        {this.state.sports
                            .filter(sport => sport.id === this.state.user.favouriteSportsIDs)
                            .map(sport => (
                                <li>{sport.name}</li>
                            ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Profile