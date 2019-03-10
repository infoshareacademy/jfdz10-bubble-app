import React, { Component } from  'react'
import {Route, NavLink, Router} from 'react-router-dom'

// import Players from '../Players'
// import Matches from '../Matches'
// import Profile from '../Profile'
// import AddMatch from '../AddMatch'

import Logout from './Logout'
import Profile from './Profile'

class Navigation extends Component {
    render() {
        return (
        <div className="Navigation">
            <ul className="ListContainer">
                <li><NavLink to="/logout">Logout</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
            </ul>
        </div>
        )
    }
}

export default Navigation