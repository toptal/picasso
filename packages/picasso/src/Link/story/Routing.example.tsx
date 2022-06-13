import React from 'react'
import { Link } from '@toptal/picasso'
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
} from 'react-router-dom'

const Index = () => {
  return <h2>Home</h2>
}

const About = () => {
  return <h2>About</h2>
}

const Users = () => {
  return <h2>Users</h2>
}

const RoutingExample = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link as={RouterLink} to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to='/about/'>
              About
            </Link>
          </li>
          <li>
            <Link as={RouterLink} to='/users/'>
              Users
            </Link>
          </li>
        </ul>
      </nav>

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
    </div>
  </Router>
)

export default RoutingExample
