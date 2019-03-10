import React, { Component } from  'react'
import { Route,NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

// import Players from '../Players'
// import Matches from '../Matches'
// import Profile from '../Profile'
// import AddMatch from '../AddMatch'


// class Navigation extends Component {
//     render() {
//         return (
//         <div className="Navigation">
//             <ul className="ListContainer">
//                 <li><NavLink to="/profile">Profile</NavLink></li>
//                 <li><NavLink to="/matches">Matches</NavLink></li>
//                 <li><NavLink to="/players">Players</NavLink></li>
//                 <li><NavLink to="/addMatch">Add Match</NavLink></li>
//                 <li><NavLink to="/logout">Logout</NavLink></li>
//                 <Route exact path="/matches" component={() => <h1>Here you can see planned matches.</h1>} />
//                 <Route exact path = "/profile" component={() => <h1>This is your profile.</h1>} />
//                 <Route exact path = "/players" component={() => <h1>Here you can find other players.</h1>} />
//                 <Route exact path="/addMatch" component={() => <h1>Here you can add a new match.</h1>} />
//                 <Route exact path="/logout" component={() => <h1>You ar not logged in. Sign in or Register.</h1>} />
//             </ul>
//         </div>
//         )
//     }
// }

class Navigation extends Component {
    state = { activeItem: 'home' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu secondary>
        
        <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          />
          <Menu.Item 
            name='matches' 
            active={activeItem === 'matches'} 
            onClick={this.handleItemClick} />
          <Menu.Item
            name='players'
            active={activeItem === 'players'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='add match'
            active={activeItem === 'add match'}
            onClick={this.handleItemClick}
          />
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />

        <Route exact path = "/profile" component={() => <h1>This is your profile.</h1>} />
        </Menu>
      )
    }
  }

export default Navigation