import React, { Component } from  'react'
import { Route,NavLink } from 'react-router-dom'

// import Players from '../Players'
// import Matches from '../Matches'
// import Profile from '../Profile'
// import AddMatch from '../AddMatch'


class Navigation extends Component {
    render() {
        return (
        <div className="Navigation">
            <ul className="ListContainer">
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/matches">Matches</NavLink></li>
                <li><NavLink to="/players">Players</NavLink></li>
                <li><NavLink to="/addmatch">Add Match</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
                <Route exact path="/matches" component={() => <h1>Here you can see planned matches.</h1>} />
                <Route exact path = "/profile" component={() => <h1>This is your profile.</h1>} />
                <Route exact path = "/players" component={() => <h1>Here you can find other players.</h1>} />
                <Route exact path="/addmatch" component={() => <h1>Here you can add a new match.</h1>} />
                <Route exact path="/logout" component={() => <h1>You ar not logged in. Sign in or Register.</h1>} />
            </ul>
        </div>
        )
    }
}

export default Navigation