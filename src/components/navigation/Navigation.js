import React, { Component } from  'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

class Navigation extends Component {
    render() {
        return (
        <div className="Navigation">
            <ul className="ListContainer">
                <li className="ListItem"><NavLink to="/addMatch">AddMatch</NavLink></li>
                <li className="ListItem"><NavLink to="/players">Players</NavLink></li>
                <li className="ListItem"><NavLink to="/matches">Matches</NavLink></li>
                <li className="ListItem"><NavLink to="/profile">Profile</NavLink></li>
            </ul>
        </div>
        )
    }
}


export default Navigation
