import React from 'react'
import {
  MemoryRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Container, Logo } from '@toptal/picasso'
import { Breadcrumbs } from '@toptal/picasso-lab'

const Usa = () => <h2>USA</h2>
const Software = () => <h2>Software</h2>
const Toptal = () => (
  <Container top='small'>
    <Logo />
  </Container>
)

const StepperDefaultExample = () => (
  <Container>
    <Router>
      <Breadcrumbs
        items={[
          { text: 'USA', href: '/usa' },
          { text: 'Software', href: '/usa/software' },
          { text: 'Toptal', href: '/usa/software/toptal' }
        ]}
      />
      <Switch>
        <Redirect exact from='/' to='/usa/software/toptal' />
        <Route path='/usa' component={Usa} exact />
        <Route path='/usa/software' component={Software} exact />
        <Route path='/usa/software/toptal' component={Toptal} exact />
      </Switch>
    </Router>
  </Container>
)

export default StepperDefaultExample
