import React from 'react'
import { mount } from '@cypress/react'
import { Container, Notes } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const NotesTest = () => (
  <Notes>
    <Notes.Title>Awesome title</Notes.Title>
    <Notes.Subtitle>added on November 14, 2019 at 3:46</Notes.Subtitle>
    <Notes.Content>
      This is a dummy content comment used for example purpouses
    </Notes.Content>
  </Notes>
)

describe('ButtonAction', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <NotesTest />

        <Container variant='blue'>
          <NotesTest />
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
