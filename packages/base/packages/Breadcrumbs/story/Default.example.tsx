import React from 'react'
import {
  MemoryRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { Container, Logo, Link, Breadcrumbs } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Usa = () => <h2>USA</h2>
const Software = () => <h2>Software</h2>
const Toptal = () => (
  <Container top={SPACING_4}>
    <Logo />
  </Container>
)

const items = [
  { text: 'USA', to: '/usa' },
  { text: 'Software', to: '/usa/software' },
  { text: 'Toptal', to: '/usa/software/toptal' },
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
        <Route path='/usa/software/toptal'>
          <Toptal />
        </Route>
        <Route path='/usa/software'>
          <Software />
        </Route>
        <Route path='/usa'>
          <Usa />
        </Route>
      </Switch>
    </Router>
  </Container>
)

export default Example
