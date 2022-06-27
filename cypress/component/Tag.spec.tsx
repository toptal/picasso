import React from 'react'
import { Container, Tag, TypographyOverflow } from '@toptal/picasso'

const component = 'Tag'

describe('Tag', () => {
  it('allows to overflow with ellipsis', () => {
    cy.mount(
      <Container style={{ width: '500px' }}>
        <Tag variant='light-grey'>
          <TypographyOverflow inline weight='semibold'>
            Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong
          </TypographyOverflow>
        </Tag>
      </Container>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'overflow',
    })
  })
})
