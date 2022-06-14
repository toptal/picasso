import React from 'react'
import { EnvironmentBanner } from '@toptal/picasso'

describe('EnvironmentBanner', () => {
  it('renders in development enviroment', () => {
    cy.mount(
      <EnvironmentBanner environment='development' productName='Picasso' />
    )
    cy.get('body').happoScreenshot()
  })
  it('renders in staging enviroment', () => {
    cy.mount(<EnvironmentBanner environment='staging' productName='Picasso' />)
    cy.get('body').happoScreenshot()
  })
  it('renders in temploy enviroment', () => {
    cy.mount(<EnvironmentBanner environment='temploy' productName='Picasso' />)
    cy.get('body').happoScreenshot()
  })
})
