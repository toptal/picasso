import React from 'react'
import {
  Link,
  Container,
  Typography,
  Menu,
  UserBadge,
  ChevronRight16
} from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TestUserBadgeLink = () => {
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

describe('Link', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <Link>Link</Link>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders action variant', () => {
    mount(
      <TestingPicasso>
        <Link variant='action'>Action link</Link>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders colored', () => {
    mount(
      <TestingPicasso>
        <Container style={{ background: 'black' }} padded='small'>
          <Link color='white'>Action link</Link>
        </Container>
        <Container padded='small'>
          <Link color='black'>Action link</Link>
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders big link', () => {
    mount(
      <TestingPicasso>
        <Typography variant='heading' size='large'>
          Big <Link fontSize='inherit'>link</Link>
        </Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders without underline', () => {
    mount(
      <TestingPicasso>
        <Link textDecoration='none'>Link</Link>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders user badge link', () => {
    mount(<TestUserBadgeLink />)
    cy.get('body').happoScreenshot()
  })

  describe('when hover over the link', () => {
    it('renders link without underline', () => {
      mount(
        <TestingPicasso>
          <Link data-testid='link'>Link</Link>
        </TestingPicasso>
      )

      cy.get('[data-testid="link"')
        .realHover()
        .should('have.css', 'text-decoration', 'none solid rgb(32, 78, 207)')
    })
  })

  describe('when hover over a disabled link', () => {
    it('renders link with underline', () => {
      mount(
        <TestingPicasso>
          <Link data-testid='link' disabled>
            Link
          </Link>
        </TestingPicasso>
      )

      cy.get('[data-testid="link"')
        .realHover()
        .should(
          'have.css',
          'text-decoration',
          'underline solid rgb(132, 136, 142)'
        )
    })
  })

  describe('when hover over a none decoracted link', () => {
    it('renders link without underline', () => {
      mount(
        <TestingPicasso>
          <Link data-testid='link' textDecoration='none'>
            Link
          </Link>
        </TestingPicasso>
      )

      cy.get('[data-testid="link"')
        .realHover()
        .should('have.css', 'text-decoration', 'none solid rgb(32, 78, 207)')
    })
  })
})
