import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const component = 'Avatar'

describe('Avatar', () => {
  describe('when avatar is editable and focused', () => {
    let src = ''
    const handleEdit = () => {}

    before(() => {
      // eslint-disable-next-line max-nested-callbacks, promise/catch-or-return
      cy.fixture('pablo.jpg').then(image => {
        src = 'data:image/jpg;base64,' + image

        return image
      })
    })

    it('renders outline around avatar', () => {
      cy.mount(
        <Container padded='small' gap='small'>
          <Avatar
            alt='Jacqueline Roque. Pablo Picasso, 1954'
            src={src}
            name='Jacqueline Roque'
            size='medium'
            onEdit={handleEdit}
          />
        </Container>
      )

      cy.get('button').focus()
      cy.get('body').happoScreenshot({
        component,
        variant: 'editable/after-focus',
      })
    })
  })

  describe('when emblem prop is true', () => {
    let src = ''
    const handleEdit = () => {}

    before(() => {
      // eslint-disable-next-line max-nested-callbacks, promise/catch-or-return
      cy.fixture('pablo.jpg').then(image => {
        src = 'data:image/jpg;base64,' + image

        return image
      })
    })

    it('shows emblem', () => {
      cy.mount(
        <Container padded='small' gap='small'>
          <Avatar
            alt='Jacqueline Roque. Pablo Picasso, 1954'
            src={src}
            name='Jacqueline Roque'
            size='medium'
            onEdit={handleEdit}
            emblem={true}
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
