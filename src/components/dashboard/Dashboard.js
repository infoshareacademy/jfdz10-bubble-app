import React, { Component } from  'react'
import './Dashboard.css'
import { Button, Form, Input } from 'semantic-ui-react'
import firebase from 'firebase'

class Dashboard extends Component {

    state = {
        isSigningIn: false,
        isSigningUp: false,
        email: '',
        password: '',
        name: '',
        city: ''
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

    addNewUserToDatabase = () => {
        firebase.database().ref('players/' + this.state.user.uid).set(
            {
            avatar: '',
            dateOfJoining: this.state.user.metadata.creationTime,
            eMail: this.state.email,
            id: this.state.user.uid,
            localization: this.state.city,
            name: this.state.name
            } 
        )
    }

    addUserWithGoogle = () => {

    }

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

    componentDidMount() {
        const ref = firebase.auth().onAuthStateChanged(user =>
            this.setState({
                user
            }));

        this.setState({
            ref
        })
    }

    componentWillUnmount() {
        this.state.ref && this.state.ref();
    }

    render() {
        return (
            <div class="dashboard">
                <div 
                className="signing"
                style={{display: this.state.user ? 'none' : 'flex'}}
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
                <div class="dashboard-background" style={{display: this.state.isSigningIn || this.state.isSigningUp ? 'none' : 'flex'}}>
                    <div class="general-container">
                        <div class="left-top-container"></div>
                        <div class="right-top-container"></div>
                        <div class="right-bottom-container"></div>
                        <div class="left-bottom-container"></div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Dashboard
