import React from 'react'
import {
  Link,
  Container,
  Typography,
  Menu,
  UserBadge,
  ChevronRight16,
} from '@toptal/picasso'

import { toHaveStyle, toMatchFocusVisible } from '../support/focus'

const PURPLE_MAIN = 'rgb(103, 39, 207)'
const GREY = 'rgb(196, 198, 202)'

const TestUserBadgeLink = () => {
  return (
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
  )
}

const component = 'Link'

// 3px ring at 48% opacity, serialized as rgba() or oklab()
const FOCUS_RING = / 0\.48\) 0px 0px 0px 3px$/
const WHITE_FOCUS_RING =
  /(rgba\(255, 255, 255, 0\.48\)|oklab\((1|0\.99\d*) \S+ \S+ \/ 0\.48\)) 0px 0px 0px 3px$/

const renderFocusableLink = (color?: 'white') =>
  cy.mount(
    <>
      <button>Before</button>
      <Link href='#' color={color} data-testid='link'>
        Link
      </Link>
    </>
  )

describe('Link', () => {
  describe('when action variant and disabled', () => {
    it('renders action variant without underline', () => {
      cy.mount(
        <Typography size='medium'>
          <Link variant='action' disabled>
            Action link
          </Link>
        </Typography>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'disabled/without-underline',
      })
    })
  })

  it('renders user badge link', () => {
    cy.mount(<TestUserBadgeLink />)
    cy.get('body').happoScreenshot({
      component,
      variant: 'with-user-badge',
    })
  })

  describe('when hover over the link', () => {
    it('renders link without underline', () => {
      cy.mount(
        <Typography size='medium'>
          <Link data-testid='link'>Link</Link>
        </Typography>
      )

      cy.getByTestId('link')
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
      cy.mount(
        <Typography size='medium'>
          <Link data-testid='link' disabled>
            Link
          </Link>
        </Typography>
      )

      cy.getByTestId('link')
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
      cy.mount(
        <Typography size='medium'>
          <Link data-testid='link' noUnderline>
            Link
          </Link>
        </Typography>
      )

      cy.getByTestId('link')
        .realHover()
        .should('have.css', 'text-decoration', 'none solid rgb(32, 78, 207)')
    })
  })

  describe('when hover over a disabled action link', () => {
    it('renders link without underline', () => {
      cy.mount(
        <Typography size='medium'>
          <Link data-testid='link' variant='action' disabled>
            Link
          </Link>
        </Typography>
      )

      cy.getByTestId('link')
        .realHover()
        .should('have.css', 'text-decoration', 'none solid rgb(32, 78, 207)')
    })
  })

  describe('when a Link has been visited', () => {
    it('indicates itself by a proper color', () => {
      cy.mount(
        <>
          <Link visited data-testid='blue-link' href='#'>
            Link
          </Link>
          <Link visited color='white' data-testid='white-link' href='#'>
            Link
          </Link>
        </>
      )

      cy.getByTestId('blue-link').should('have.css', 'color', PURPLE_MAIN)

      cy.getByTestId('white-link').should('have.css', 'color', GREY)
    })
  })

  describe('when focused', () => {
    it('shows focus ring on keyboard focus', () => {
      renderFocusableLink()

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('link')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
    })

    it('shows white focus ring on keyboard focus of a white link', () => {
      renderFocusableLink('white')

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('link')
        .should('have.focus')
        .and(toHaveStyle('boxShadow', WHITE_FOCUS_RING))
    })

    it('does not show focus ring on mouse focus', () => {
      renderFocusableLink()

      cy.getByTestId('link').realClick()

      cy.getByTestId('link')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })
  })
})
