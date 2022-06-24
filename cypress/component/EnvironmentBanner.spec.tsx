import React from 'react'
import { EnvironmentBanner } from '@toptal/picasso'

const component = 'EnvironmentBanner'

describe('EnvironmentBanner', () => {
  it('renders in development enviroment', () => {
    cy.mount(
      <EnvironmentBanner environment='development' productName='Picasso' />
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'development-environment',
    })
  })

  it('renders in staging enviroment', () => {
    cy.mount(<EnvironmentBanner environment='staging' productName='Picasso' />)
    cy.get('body').happoScreenshot({
      component,
      variant: 'staging-environment',
    })
  })

  it('renders in temploy enviroment', () => {
    cy.mount(<EnvironmentBanner environment='temploy' productName='Picasso' />)
    cy.get('body').happoScreenshot({
      component,
      variant: 'temploy-environment',
    })
  })
})
