import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

import { loadAvatarFixture } from '../support/fixtures'

const component = 'Avatar'

const getAvatarSrc = loadAvatarFixture()
const handleEdit = () => {}

describe('Avatar', () => {
  describe('when avatar is editable and focused', () => {
    it('renders outline around avatar', () => {
      cy.mount(
        <Container padded='small' gap='small'>
          <Avatar
            alt='Jacqueline Roque. Pablo Picasso, 1954'
            src={getAvatarSrc()}
            name='Jacqueline Roque'
            size='medium'
            onEdit={handleEdit}
          />
        </Container>
      )

      cy.get('button').focus()

      // let the base64 fixture image decode before capturing
      cy.waitForImagesDecoded()

      cy.get('body').happoScreenshot({
        component,
        variant: 'editable/after-focus',
      })
    })
  })

  describe('when showEmblem prop is true', () => {
    it('shows emblem', () => {
      cy.mount(
        <Container padded='small' gap='small'>
          <Avatar
            alt='Jacqueline Roque. Pablo Picasso, 1954'
            src={getAvatarSrc()}
            name='Jacqueline Roque'
            size='medium'
            onEdit={handleEdit}
            showEmblem={true}
            testIds={{ wrapper: 'avatar-wrapper' }}
          />
        </Container>
      )

      cy.get('[data-testid="avatar-wrapper"]').find('img').should('be.visible')

      cy.get('body').happoScreenshot({
        component,
        variant: 'shows emblem',
      })
    })
  })
})
