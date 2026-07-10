import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

import { loadAvatarFixture } from '../support/fixtures'

const component = 'AvatarUpload'

const getAvatarSrc = loadAvatarFixture()

describe('AvatarUpload', () => {
  describe('when source file exists', () => {
    it('renders upload icon over image avatar', () => {
      cy.mount(
        <Container padded='small' gap='small'>
          <AvatarUpload src={getAvatarSrc()} alt='avatar' />
          <AvatarUpload src={getAvatarSrc()} alt='avatar' size='large' />
        </Container>
      )

      cy.waitForImagesDecoded()

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-source-file',
      })
    })
  })
})
