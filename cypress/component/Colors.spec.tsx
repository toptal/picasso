import React from 'react'
import Colors from '@toptal/picasso/utils/Colors/story/Default.example'

const component = 'Colors'

describe('Colors palette', () => {
  it('renders palette', () => {
    cy.mount(<Colors />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })
})
