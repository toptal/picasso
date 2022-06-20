import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import { NoteCompound as Note } from '../NoteCompound'

const renderNote = () => {
  return render(
    <Note>
      <Note.Title>Title</Note.Title>
      <Note.Subtitle>Subtitle</Note.Subtitle>
      <Note.Content>Content</Note.Content>
    </Note>
  )
}

describe('Note', () => {
  it('renders', () => {
    const { container } = renderNote()

    expect(container).toMatchSnapshot()
  })
})
