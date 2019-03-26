import React, { Component } from  'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'




class Navigation extends Component {

    changeColor = (e) => {
        e.stopPropagation()
        const listItems = document.querySelectorAll('.ListItem')
        const navImages = document.querySelectorAll('.NavImage')
        const navLabels = document.querySelectorAll('.NavLabel')
        console.log(e, listItems)
        const listItem = e.target

        listItems.forEach(item => item.classList.remove('ActiveNav'))
        navImages.forEach(item => item.classList.remove('ActiveNav'))
        navLabels.forEach(item => item.classList.remove('ActiveNav'))
        listItem.className += ' ActiveNav'

    }

    render() {
        
        return (
        <div className="Navigation">
            <ul className="ListContainer">
                <li class='lol' className="ListItem" onClick={(e) => this.changeColor(e)}><NavLink to="/">
                    <image className='NavImage Home'></image>
                    <label className='NavLabel'>Home</label>
                </NavLink></li>
                <li class='lol' className="ListItem"onClick={(e) => this.changeColor(e)}><NavLink to="/addMatch">
                    <image className='NavImage AddMatch'></image>
                    <label className='NavLabel'>AddMatch</label>
                </NavLink></li>
                <li className="ListItem"onClick={(e) => this.changeColor(e)}><NavLink to="/players">
                    <image className='NavImage Players'></image>
                    <label className='NavLabel'>Players</label>
                </NavLink></li>
                <li className="ListItem"onClick={(e) => this.changeColor(e)}><NavLink to="/matches">
                    <image className='NavImage Matches'></image>
                    <label className='NavLabel'>Matches</label>
                </NavLink></li>
                <li className="ListItem"onClick={(e) => this.changeColor(e)}><NavLink to="/profile">
                    <image className='NavImage NavProfile'></image>
                    <label className='NavLabel'>Profile</label>
                </NavLink></li>
            </ul>
        </div>
        )
    }
}


export default Navigation
