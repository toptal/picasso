import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

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
        <Container padded={SPACING_4} gap={SPACING_4}>
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
})
