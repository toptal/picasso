import React from 'react'
import Colors from '@toptal/picasso/utils/Colors/story/Default.example'

describe('Colors palette', () => {
  it('renders palette', () => {
    cy.mount(<Colors />)

    cy.get('body').happoScreenshot()
  })
})
