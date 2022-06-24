import React from 'react'
import { Note } from '@toptal/picasso'

const NoteExample = () => (
  <Note>
    <Note.Title>Awesome title</Note.Title>
    <Note.Subtitle>added on November 14, 2019 at 3:46</Note.Subtitle>
    <Note.Content>
      This is a dummy content comment used for example purpouses
    </Note.Content>
  </Note>
)

const component = 'Note'

describe('Note', () => {
  it('renders', () => {
    cy.mount(<NoteExample />)
    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })
})
