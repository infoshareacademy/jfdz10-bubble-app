import React, { Component } from 'react'
import './Dashboard.css'
import { Button, Form, Input } from 'semantic-ui-react'
import firebase from 'firebase'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie
} from 'recharts';
import moment from 'moment'

const substractDays = (daysBefore) => {
    let startdate = moment();
    startdate = startdate.subtract(daysBefore, "days");
    startdate = startdate.format("MMM DD YYYY");
    return startdate
}

class Dashboard extends Component {

    state = {
        isSigningIn: false,
        isSigningUp: false,
        email: '',
        password: '',
        name: '',
        city: '',
        players: [],
        matches: [],
        sports: [],
        refs: [],
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
        })
    };

    getMatches = () => {
        const matchesRef = firebase.database().ref('matches');
        matchesRef.on('value', (snapshot) => {
            const matches = snapshot.val();
            const matchesArray = Object.keys(matches).map(key => ({
                id: key,
                ...matches[key]
            }));

            this.setState({
                matches: matchesArray
            })
        })
        const newRefs = [matchesRef, ...this.state.refs];
        this.setState({
            refs: newRefs
        })
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

        if (this.state.isSigningUp) {
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
                .catch((error) => { alert(error.message) })

        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    alert('You have successfully logged in. Welcome back!')
                    this.setState({
                        isSigningIn: false,
                        isSigningUp: false
                    })
                })
                .catch((error) => { alert(error.message) })
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


    signInWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;
            if (!firebase.database().ref('players/' + user.uid)) {
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
            }
        }).catch(function (error) {
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }

    parsePlayersByDate = (daysAgo) => {
        return this.state.players
            .filter(player => (
                moment(player.dateOfJoining).format("MMM DD YYYY") === substractDays(daysAgo)
            ))
            .map(player => (
                player.localization
            ))
    }

    parsePlayersByLocalization = (joinedByDay) => {

        const cityCount = joinedByDay.reduce((total, city) => {
            total[city] = (total[city] || 0) + 1;
            return total;
        }, {})
        return cityCount
    }

    prepareDataForWeeklyChart = () => {
        let today = this.parsePlayersByDate(0)
        let daysAgo7 = this.parsePlayersByDate(7)
        let daysAgo6 = this.parsePlayersByDate(6)
        let daysAgo5 = this.parsePlayersByDate(5)
        let daysAgo4 = this.parsePlayersByDate(4)
        let daysAgo3 = this.parsePlayersByDate(3)
        let daysAgo2 = this.parsePlayersByDate(2)
        let daysAgo1 = this.parsePlayersByDate(1)

        today = Object.assign({ name: substractDays(0) }, this.parsePlayersByLocalization(today))
        daysAgo1 = Object.assign({ name: substractDays(1) }, this.parsePlayersByLocalization(daysAgo1))
        daysAgo2 = Object.assign({ name: substractDays(2) }, this.parsePlayersByLocalization(daysAgo2))
        daysAgo3 = Object.assign({ name: substractDays(3) }, this.parsePlayersByLocalization(daysAgo3))
        daysAgo4 = Object.assign({ name: substractDays(4) }, this.parsePlayersByLocalization(daysAgo4))
        daysAgo5 = Object.assign({ name: substractDays(5) }, this.parsePlayersByLocalization(daysAgo5))
        daysAgo6 = Object.assign({ name: substractDays(6) }, this.parsePlayersByLocalization(daysAgo6))
        daysAgo7 = Object.assign({ name: substractDays(7) }, this.parsePlayersByLocalization(daysAgo7))

        const data = [today, daysAgo1, daysAgo2, daysAgo3, daysAgo4, daysAgo5, daysAgo6, daysAgo7].reverse()

        return data;
    }

    prepareDataKeysForWeeklyChart = () => {

        let dataKeys = this.state.players.map(player => (
            player.localization
        ))
        dataKeys = new Set(dataKeys)
        dataKeys = Array.from(dataKeys)

        return dataKeys
    }

    prepareDataForPieChart = () => {
        let data = this.state.matches
        .map(match => (
            match.sportID
        ))    
        .reduce((total, match) => {
            total[match] = (total[match] || 0) + 1;
            return total;
        }, {})

        data = Object.keys(data).map((key, index) => ({
            name: key,
            value: Object.values(data)[index],
        }))
      
        let newData = data.map(data => (
            {
                name: this.state.sports
                    .filter(sport => (
                        sport.id === parseInt(data.name)
                    ))
                    .map(sport => (
                        sport.name
                    ))[0],
                value: data.value,
            }
        ))
        return newData;
    }


    componentDidMount() {
        this.getPlayers()
        this.getMatches()
        this.getSports()

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
                    style={{ display: this.state.user ? 'none' : 'flex' }}
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
                        style={{ display: this.state.isSigningIn || this.state.isSigningUp ? 'block' : 'none' }}
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
                                style={{ display: this.state.isSigningUp ? 'flex' : 'none' }} />
                            <Form.Field
                                name='city'
                                control={Input}
                                label={this.state.isSigningUp ? 'City' : ''}
                                placeholder='SimCity'
                                onChange={this.handleChange}
                                style={{ display: this.state.isSigningUp ? 'flex' : 'none' }} />
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
                <div class="dashboard-background" style={{ display: this.state.isSigningIn || this.state.isSigningUp ? 'none' : 'flex' }}>
                    <div class="general-container">
                    <h3 className="chart-header">JOINED THIS WEEK</h3>
                        <div className="chart-container">
                            <ResponsiveContainer>
                                <AreaChart
                                    data={this.prepareDataForWeeklyChart()}
                                    margin={{
                                        top: 10, right: 30, left: 0, bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    {this.prepareDataKeysForWeeklyChart().map(dataKey => (
                                        <Area type="monotone" dataKey={dataKey} stackId="1" stroke="#8884d8" fill={"#" + ((1 << 24) * Math.random() | 0).toString(16)} />
                                    ))}

                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <h3 className="chart-header">TOTAL MATCHES</h3>
                        <div className="chart-container">
                            <ResponsiveContainer>
                            <PieChart>
                                <Pie dataKey="value" isAnimationActive={false} data={this.prepareDataForPieChart()}  outerRadius={80} fill="#00ADE6" label />
                                <Tooltip />
                            </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Dashboard
