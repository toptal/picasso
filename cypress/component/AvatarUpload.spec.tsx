import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const component = 'AvatarUpload'

describe('AvatarUpload', () => {
  describe('when source file exists', () => {
    let src = ''

    before(() => {
      // eslint-disable-next-line max-nested-callbacks, promise/catch-or-return
      cy.fixture('pablo.jpg').then(image => {
        src = 'data:image/jpg;base64,' + image

        return image
      })
    })

    it('renders upload icon over image avatar', () => {
      cy.mount(
        <Container padded='small' gap='small'>
          <AvatarUpload src={src} alt='avatar' />
          <AvatarUpload src={src} alt='avatar' size='large' />
        </Container>
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-source-file',
      })
    })
  })
})
