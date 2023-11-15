import React from 'react'
import {
  Link,
  Container,
  Typography,
  Menu,
  UserBadge,
  ChevronRight16,
} from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso/utils'

const PURPLE_MAIN = 'rgb(103, 39, 207)'
const GREY = 'rgb(196, 198, 202)'

const TestUserBadgeLink = () => {
  return (
    <Menu>
      <Menu.Item disableGutters>
        <Link href='/' style={{ width: '100%' }} noUnderline>
          <Container
            padded={SPACING_6}
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
})
