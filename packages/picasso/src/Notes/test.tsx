import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Notes from './Notes'

const renderNotes = () => {
  return render(
    <Notes>
      <Notes.Title>Title</Notes.Title>
      <Notes.Subtitle>Subtitle</Notes.Subtitle>
      <Notes.Content>Content</Notes.Content>
    </Notes>
  )
}

describe('Notes', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderNotes()
  })
  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
