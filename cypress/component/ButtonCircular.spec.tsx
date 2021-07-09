import React from 'react'
import { mount } from '@cypress/react'
import { Button, Container, Settings16 } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { palette } from '@toptal/picasso/utils'

describe('Button.Circular', () => {
  it('renders flat variant', () => {
    mount(
      <TestingPicasso>
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
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
