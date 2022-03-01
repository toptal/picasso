import React from 'react'
import { Menu } from '@toptal/picasso'
import { MemoryRouter as Router, Link, Route, Switch } from 'react-router-dom'

const Index = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

const Example = () => (
  <Router>
    <div>
      <Menu>
        <Menu.Item as={Link} to='/'>
          Home
        </Menu.Item>
        <Menu.Item as={Link} to='/about'>
          About
        </Menu.Item>
        <Menu.Item as={Link} to='/users'>
          Contact
        </Menu.Item>
      </Menu>
    </div>
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/users'>
        <Users />
      </Route>
      <Route>
        <Index />
      </Route>
    </Switch>
  </Router>
)

export default Example
