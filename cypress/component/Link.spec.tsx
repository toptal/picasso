import React from 'react'
import { mount } from '@cypress/react'
import {
  Link,
  LinkProps,
  Container,
  Typography,
  Menu,
  UserBadge,
  ChevronRight16
} from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { palette } from '@toptal/picasso/utils'

const ContainerExample = () => {
  return (
    <TestingPicasso>
      <Menu>
        <Menu.Item disableGutters>
          <Link href='/' textDecoration='none' style={{ width: '100%' }}>
            <Container
              padded='medium'
              flex
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <UserBadge name='Foo Bar'>
                <Typography size='small'>Foo bar position</Typography>
              </UserBadge>
              <ChevronRight16 color='dark-grey' />
            </Container>
          </Link>
        </Menu.Item>
      </Menu>
    </TestingPicasso>
  )
}

const TestLink: React.FC<LinkProps> = props => (
  <TestingPicasso>
    <Link href='/' {...props}>
      Foo bar
    </Link>
  </TestingPicasso>
)

describe('Link', () => {
  it('renders default', () => {
    mount(<TestLink />)
    cy.get('body').happoScreenshot()
  })
  it('renders action variant', () => {
    mount(<TestLink variant='action' />)
    cy.get('body').happoScreenshot()
  })
  it('renders in colors', () => {
    mount(
      <TestingPicasso>
        <div>
          <Container inline right='large'>
            <TestLink />
          </Container>
          <Container inline right='large'>
            <TestLink color='blue' />
          </Container>
          <Container inline right='large'>
            <TestLink color='black' />
          </Container>
          <Container
            inline
            padded='medium'
            style={{ backgroundColor: palette.grey.darker }}
          >
            <TestLink color='white' />
          </Container>
          <Container
            inline
            padded='medium'
            style={{ backgroundColor: palette.grey.darker }}
          >
            <TestLink color='white' variant='action' />
          </Container>
        </div>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders disabled', () => {
    mount(<TestLink disabled />)
    cy.get('body').happoScreenshot()
  })
  it('renders inside heading', () => {
    mount(
      <TestingPicasso>
        <Typography variant='heading' size='large'>
          Please{' '}
          <Link href='/' fontSize='inherit'>
            Foo bar
          </Link>{' '}
          your email
        </Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders container variant', () => {
    mount(<ContainerExample />)
    cy.get('body').happoScreenshot()
  })
})
