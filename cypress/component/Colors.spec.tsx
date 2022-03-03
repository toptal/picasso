import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import Colors from '@toptal/picasso/utils/Colors/story/Default.example'

describe('Colors palette', () => {
  it('renders palette', () => {
    mount(
      <TestingPicasso>
        <Colors />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })
})
