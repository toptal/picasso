import React from 'react'
import { CounterBlock } from '@toptal/picasso-lab'
import { MemoryRouter as Router, Link, Route, Switch } from 'react-router-dom'

const Index = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

const RoutingExample = () => (
  <Router>
    <div>
      <CounterBlock.Group>
        <CounterBlock value='10' label='Home' as={Link} to='/' />
        <CounterBlock
          value='11'
          label='About'
          color='green'
          as={Link}
          to='/about'
        />
        <CounterBlock
          value='15'
          label='Users'
          color='blue'
          as={Link}
          to='/users'
        />
      </CounterBlock.Group>

      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/about' component={About} />
        <Route path='/users' component={Users} />
        <Route component={Index} />
      </Switch>
    </div>
  </Router>
)

export default RoutingExample
