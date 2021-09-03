import React from 'react'
import {
  MemoryRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
  Redirect,
  useLocation
} from 'react-router-dom'
import { Container, Logo, Link, Breadcrumbs } from '@toptal/picasso'

const Usa = () => <h2>USA</h2>
const Software = () => <h2>Software</h2>
const Toptal = () => (
  <Container top='small'>
    <Logo />
  </Container>
)

const items = [
  { text: 'USA', to: '/usa' },
  { text: 'Software', to: '/usa/software' },
  { text: 'Toptal', to: '/usa/software/toptal' }
]

const ExampleLink: typeof Link = props => (
  <Link as={RouterLink} variant='action' {...props} />
)

const Nav = () => {
  const location = useLocation()
  const activeIndex = items.map(item => item.to).indexOf(location.pathname)

  return (
    <Breadcrumbs>
      {items.map((item, itemIndex) => (
        <Breadcrumbs.Item
          as={ExampleLink}
          key={item.text}
          to={item.to}
          active={itemIndex === activeIndex}
        >
          {item.text}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  )
}

const Example = () => (
  <Container>
    <Router>
      <Nav />
      <Switch>
        <Redirect exact from='/' to='/usa/software/toptal' />
        <Route path='/usa' component={Usa} exact />
        <Route path='/usa/software' component={Software} exact />
        <Route path='/usa/software/toptal' component={Toptal} exact />
      </Switch>
    </Router>
  </Container>
)

export default Example
