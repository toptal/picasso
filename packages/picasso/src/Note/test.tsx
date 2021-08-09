import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Note from './Note'

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
  it('default render', () => {
    const { container } = renderNote()

    expect(container).toMatchSnapshot()
  })
})
