import React from 'react'
import { Button, Container, Settings16 } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

describe('Button.Circular', () => {
  it('renders flat variant', () => {
    cy.mount(
      <Container
        inline
        style={{ backgroundColor: palette.blue.lighter }}
        padded='small'
      >
        <Button.Circular variant='flat' icon={<Settings16 />} />
        <Button.Circular variant='flat' hovered icon={<Settings16 />} />
        <Button.Circular variant='flat' focused icon={<Settings16 />} />
        <Button.Circular variant='flat' active icon={<Settings16 />} />
        <Button.Circular variant='flat' loading icon={<Settings16 />} />
        <Button.Circular variant='flat' disabled icon={<Settings16 />} />
      </Container>
    )
    cy.get('body').happoScreenshot()
  })
})
