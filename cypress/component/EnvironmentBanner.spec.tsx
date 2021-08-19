import React from 'react'
import { mount } from '@cypress/react'
import { EnvironmentBanner } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('EnvironmentBanner', () => {
  it('renders in development enviroment', () => {
    mount(
      <TestingPicasso>
        <EnvironmentBanner environment='development' productName='Picasso' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders in staging enviroment', () => {
    mount(
      <TestingPicasso>
        <EnvironmentBanner environment='staging' productName='Picasso' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders in temploy enviroment', () => {
    mount(
      <TestingPicasso>
        <EnvironmentBanner environment='temploy' productName='Picasso' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
