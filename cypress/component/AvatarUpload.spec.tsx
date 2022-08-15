import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const component = 'AvatarUpload'

describe('AvatarUpload', () => {
  describe('when warning message provided', () => {
    it('renders warning icon and tooltip', () => {
      cy.mount(
        <Container padded='small'>
          <AvatarUpload
            warningMessage={
              <span data-testid='warning-content'>File is too big</span>
            }
            testIds={{
              imageAvatar: 'image-avatar',
              loader: 'loader',
              warningIcon: 'warning-icon',
            }}
          />
        </Container>
      )

      cy.getByTestId('warning-icon').realHover()
      cy.getByTestId('warning-content').should('be.visible')

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-warning-message/after-hover',
      })
    })
  })
})
