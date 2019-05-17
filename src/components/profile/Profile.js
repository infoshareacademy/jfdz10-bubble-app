import React, { Component } from 'react'
import firebase from 'firebase'
import { Button, Form, Input } from 'semantic-ui-react'

import './Profile.css'

const fetchUser = async () => {
    const response = await fetch(process.env.PUBLIC_URL + '/user.json')
    const user = await response.json()
    return user
}

class Profile extends Component {
    state = {
        user : {},
        loggedInUserID: '',
        sports: [],
        players: [],
        refs: [],
        ref: '',
        isSigningIn: false,
        isSigningUp: false,
        email: '',
        password: '',
        name: '',
        city: ''
    }

    componentDidMount() {
        this.getSports()
        this.getPlayers()

        const ref = firebase.auth().onAuthStateChanged(user =>
            user 
            ? this.setState({
                ...this.state,
                loggedInUserID: user.uid
                }, () => firebase.database().ref('players/' + this.state.loggedInUserID).once('value')
                    .then(snapshot => this.setState({
                        ...this.state,
                        user: snapshot.val()
                    }))
            )
            : this.setState({
                ...this.state,
                loggedInUserID: null
            })
        )

        this.setState({
            ref
        })

    }
    
    

     
    componentWillUnmount() {
        this.state.ref && this.state.ref();
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
        playersRef.on('value', (snapshot) => {
            const players = snapshot.val();
            const playersArray = Object.keys(players).map(key => ({
                id: key,
                ...players[key]
            }));
      
            this.setState({
                players: playersArray
            })
        })};

    handleSignOut() {
        firebase.auth().signOut()
            .then( alert('Successfully signed out.'))
            .catch(error => alert(error.message))
    }

    handleSignIn = () => {
        this.setState({
            isSigningIn: true,
            isSigningUp: false
        })
    }

    handleSignUp = () => {
        this.setState({
            isSigningUp: true,
            isSigningIn: false
        })
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.isSigningUp) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    alert('Registration has succeeded. Welcome to the game!');
                    this.setState({
                        isSigningIn: false,
                        isSigningUp: false
                    })
                })
                .then(
                    setTimeout(this.addNewUserToDatabase, 3000)
                )
                .catch((error) => {alert(error.message)})
            
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    alert('You have successfully logged in. Welcome back!')
                    this.setState({
                        isSigningIn: false,
                        isSigningUp: false
                    })
                })
                .catch((error) => {alert(error.message)})
        }
    };

    signInWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            if(!firebase.database().ref('players/' + user.uid)) {
            firebase.database().ref('players/' + user.uid).set(
                {
                avatar: user.photoURL,
                dateOfJoining: user.metadata.creationTime,
                eMail: user.email,
                id: user.uid,
                localization: "Unknown",
                name: user.displayName
                } 
            )
          }}).catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage)
          });
    }

    render() {

console.log(this.state.user)

        let favSports = this.state.user.favouriteSportsIDs || []
        let favPlayers = this.state.user.favouritePlayersIDs || []

        return (
            <div className='Profile'>
                {
                    this.state.loggedInUserID ? (
                <div>
                <div className='ProfileDetails'>
                    <header>
                        <ul className="ProfileHeader">
                            <li>Profile Details</li>
                            <li><button class="ui button" style={{display: this.state.user ? 'block' : 'none'}} onClick={this.handleSignOut}>Sign Out</button></li>
                            <li><button class="ui button">
                        Edit
                    </button></li>
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
                            <li><button class="ui button">
                        Edit
                    </button></li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.state.sports
                            .filter(sport =>  favSports.includes(sport.id)  )
                            .map(sport => (
                                <li className="FavouriteSportsListItem" key={sport.id}>{sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}</li>
                            ))}
                    </ol>
                </div>
                <div className="FavouritePlayers">
                    <header>
                        <ul className="ProfileHeader">
                            <li>Favorite Players</li>
                            <li><button class="ui button">
                        Edit
                    </button></li>
                        </ul>
                    </header>
                    <ol className="FavouriteSportsList">
                        {this.state.players
                            // .filter(player => player.id === this.state.user.favouritePlayersIDs.find(id => id === player.id) || [])
                            .filter(player => (favPlayers || []).includes(player.id))
                            .map(player => (
                                <li className="FavouriteSportsListItem" key={player.id}>{player.name}</li>
                            ))}
                    </ol>
                    </div>
                </div> )
                     : (<div>
                            <div 
                            className="signing"
                            style={{display: this.state.loggedInUserID ? 'none' : 'flex'}}
                            >
                                <button class="ui primary button" onClick={this.handleSignIn}>
                                    Sign In
                                </button>
                                <button class="ui button" onClick={this.handleSignUp}>
                                    Sign Up
                                </button>
                                <button class="ui button" onClick={this.signInWithGoogle}>
                                    Sign In With Google
                                </button>
                            </div>
                            <div className="signing-in">
                            <Form
                                className="add-a-match-form"
                                onSubmit={this.handleSubmit}
                                style={{display: this.state.isSigningIn || this.state.isSigningUp ? 'block' : 'none'}}
                            >
            
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        name='email'
                                        control={Input}
                                        label='Email'
                                        placeholder='john.bull@email.com'
                                        onChange={this.handleChange} />
                                    <Form.Field
                                        name='password'
                                        control={Input}
                                        label='Password'
                                        placeholder='Password'
                                        onChange={this.handleChange} />
                                    <Form.Field
                                        name='name'
                                        control={Input}
                                        label={this.state.isSigningUp ? 'Name' : ''}
                                        placeholder='John'
                                        onChange={this.handleChange}
                                        style={{display: this.state.isSigningUp ? 'flex' : 'none'}} />
                                <Form.Field
                                        name='city'
                                        control={Input}
                                        label={this.state.isSigningUp ? 'City' : ''}
                                        placeholder='SimCity'
                                        onChange={this.handleChange}
                                        style={{display: this.state.isSigningUp ? 'flex' : 'none'}} />
                                </Form.Group>
            
                                <Form.Field
                                    disabled={
                                        !this.state.email
                                        || !this.state.password
                                        || (this.state.isSigningUp && !this.state.name)
                                        || (this.state.isSigningUp && !this.state.city)
                                    }
                                    control={Button}>{this.state.isSigningIn ? "Sign in" : "Sign Up"}
                                </Form.Field>
                            </Form>
                            </div>
                        </div>)
                }
            </div>
        )
    }
}

export default Profile