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

  describe('when source file exists and component is hovered', () => {
    let src = ''

    beforeEach(() => {
      // eslint-disable-next-line max-nested-callbacks, promise/catch-or-return
      cy.fixture('pablo.jpg').then(image => {
        src = 'data:image/jpg;base64,' + image

        return image
      })
    })

    it('renders upload icon over image avatar', () => {
      cy.mount(
        <Container padded='small'>
          <AvatarUpload
            src={src}
            hovered
            testIds={{
              uploadIcon: 'upload-icon',
            }}
          />
        </Container>
      )

      cy.getByTestId('upload-icon').should('be.visible')

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-source-file/after-hover',
      })
    })
  })
})
