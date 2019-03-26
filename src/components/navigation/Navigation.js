import React, { Component } from  'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'




class Navigation extends Component {

    render() {
        
        return (
        <div className="Navigation">
            <ul className="ListContainer">
                <li class='lol' className="ListItem"><NavLink exact activeClassName='active' to="/">
                    <image className='NavImage Home'></image>
                    <label className='NavLabel'>Home</label>
                </NavLink></li>
                <li class='lol' className="ListItem"><NavLink activeClassName='active' to="/addMatch">
                    <image className='NavImage AddMatch'></image>
                    <label className='NavLabel'>AddMatch</label>
                </NavLink></li>
                <li className="ListItem"><NavLink activeClassName='active' to="/players">
                    <image className='NavImage Players'></image>
                    <label className='NavLabel'>Players</label>
                </NavLink></li>
                <li className="ListItem"><NavLink activeClassName='active' to="/matches">
                    <image className='NavImage Matches'></image>
                    <label className='NavLabel'>Matches</label>
                </NavLink></li>
                <li className="ListItem"><NavLink activeClassName='active' to="/profile">
                    <image className='NavImage NavProfile'></image>
                    <label className='NavLabel'>Profile</label>
                </NavLink></li>
            </ul>
        </div>
        )
    }
}


export default Navigation
