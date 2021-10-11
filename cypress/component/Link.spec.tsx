import React from 'react'
import { Link, Container, Typography } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

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
          Big <Link>link</Link>
        </Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders without underline', () => {
    mount(
      <TestingPicasso>
        <Link underline='none'>Link</Link>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders with constant underline', () => {
    mount(
      <TestingPicasso>
        <Link underline='always'>Link</Link>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
