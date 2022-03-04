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

const PURPLE_MAIN = 'rgb(103, 39, 207)'
const GREY = 'rgb(196, 198, 202)'

const TestUserBadgeLink = () => {
  return (
    <TestingPicasso>
      <Menu>
        <Menu.Item disableGutters>
          <Link href='/' style={{ width: '100%' }} noUnderline>
            <Container
              padded='medium'
              flex
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <UserBadge name='Foo Bar'>
                <Typography size='xsmall'>Foo bar position</Typography>
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
        <Typography size='medium'>
          <Link>Link</Link>
        </Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders action variant', () => {
    mount(
      <TestingPicasso>
        <Typography size='medium'>
          <Link variant='action'>Action link</Link>
        </Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  describe('when action variant and disabled', () => {
    it('renders action variant without underline', () => {
      mount(
        <TestingPicasso>
          <Typography size='medium'>
            <Link variant='action' disabled>
              Action link
            </Link>
          </Typography>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })

  it('renders colored', () => {
    mount(
      <TestingPicasso>
        <Container style={{ background: 'black' }} padded='small'>
          <Typography size='medium'>
            <Link color='white'>Action link</Link>
          </Typography>
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders big link', () => {
    mount(
      <TestingPicasso>
        <Typography variant='heading' size='large'>
          Big <Link>link</Link>
        </Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders without underline', () => {
    mount(
      <TestingPicasso>
        <Typography size='medium'>
          <Link noUnderline>Link</Link>
        </Typography>
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
          <Typography size='medium'>
            <Link data-testid='link'>Link</Link>
          </Typography>
        </TestingPicasso>
      )

      cy.get('[data-testid="link"]')
        .realHover()
        .should(
          'have.css',
          'text-decoration',
          'underline solid rgb(32, 78, 207)'
        )
    })
  })

  describe('when hover over a disabled link', () => {
    it('renders link with underline', () => {
      mount(
        <TestingPicasso>
          <Typography size='medium'>
            <Link data-testid='link' disabled>
              Link
            </Link>
          </Typography>
        </TestingPicasso>
      )

      cy.get('[data-testid="link"]')
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
          <Typography size='medium'>
            <Link data-testid='link' noUnderline>
              Link
            </Link>
          </Typography>
        </TestingPicasso>
      )

      cy.get('[data-testid="link"]')
        .realHover()
        .should('have.css', 'text-decoration', 'none solid rgb(32, 78, 207)')
    })
  })

  describe('when hover over a disabled action link', () => {
    it('renders link without underline', () => {
      mount(
        <TestingPicasso>
          <Typography size='medium'>
            <Link data-testid='link' variant='action' disabled>
              Link
            </Link>
          </Typography>
        </TestingPicasso>
      )

      cy.get('[data-testid="link"]')
        .realHover()
        .should('have.css', 'text-decoration', 'none solid rgb(32, 78, 207)')
    })
  })

  describe('when a Link has been visited', () => {
    it('indicates itself by a proper color', () => {
      mount(
        <TestingPicasso>
          <Link visited data-testid='blue-link' href='#'>
            Link
          </Link>
          <Link visited color='white' data-testid='white-link' href='#'>
            Link
          </Link>
        </TestingPicasso>
      )

      cy.get('[data-testid="blue-link"]').should(
        'have.css',
        'color',
        PURPLE_MAIN
      )

      cy.get('[data-testid="white-link"]').should('have.css', 'color', GREY)
    })
  })
})
