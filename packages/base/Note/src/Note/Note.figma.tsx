import figma from '@figma/code-connect'
import React from 'react'
import { Note } from '@toptal/picasso'

const NOTE_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=280-13514'

figma.connect(Note, NOTE_URL, {
  variant: { Variant: 'Content' },
  example: () => (
    <Note>
      <Note.Title>Title</Note.Title>
      <Note.Subtitle>Subtitle</Note.Subtitle>
      <Note.Content>Content</Note.Content>
    </Note>
  ),
})

figma.connect(Note, NOTE_URL, {
  variant: { Variant: 'Slot' },
  example: () => (
    <Note>
      <Note.Content>Custom slot content</Note.Content>
    </Note>
  ),
})
