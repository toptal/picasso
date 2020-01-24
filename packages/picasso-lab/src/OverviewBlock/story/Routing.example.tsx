import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'
import { MemoryRouter as Router, Link, Route, Switch } from 'react-router-dom'

const Index = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

const RoutingExample = () => (
  <Router>
    <div>
      <OverviewBlock.Group>
        <OverviewBlock value='10' label='Home' as={Link} to='/' />
        <OverviewBlock
          value='11'
          label='About'
          variant='label-green'
          as={Link}
          to='/about'
        />
        <OverviewBlock
          value='15'
          label='Users'
          variant='label-blue'
          as={Link}
          to='/users'
        />
      </OverviewBlock.Group>

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
