import React, { Component } from  'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

class Navigation extends Component {
    render() {
        return (
        <div className="Navigation">
            <ul className="ListContainer">
                <li className="ListItem"><NavLink to="/"><image className='ListItemImage'></image><p className='ListItemLabel'>Home</p></NavLink></li>
                <li className="ListItem"><NavLink to="/addMatch"><image className='ListItemImage'></image><p className='ListItemLabel'>AddMatch</p></NavLink></li>
                <li className="ListItem"><NavLink to="/players"><image className='ListItemImage'></image><p className='ListItemLabel'>Players</p></NavLink></li>
                <li className="ListItem"><NavLink to="/matches"><image className='ListItemImage'></image><p className='ListItemLabel'>Matches</p></NavLink></li>
                <li className="ListItem"><NavLink to="/profile"><image className='ListItemImage'></image><p className='ListItemLabel'>Profile</p></NavLink></li>
            </ul>
        </div>
        )
    }
}


export default Navigation
