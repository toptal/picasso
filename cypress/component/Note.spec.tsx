import React from 'react'
import { mount } from '@cypress/react'
import { Container, Note } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const NoteExample = () => (
  <Note>
    <Note.Title>Awesome title</Note.Title>
    <Note.Subtitle>added on November 14, 2019 at 3:46</Note.Subtitle>
    <Note.Content>
      This is a dummy content comment used for example purpouses
    </Note.Content>
  </Note>
)

describe('ButtonAction', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <NoteExample />

        <Container variant='blue'>
          <NoteExample />
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
