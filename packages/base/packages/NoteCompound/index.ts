/* eslint-disable import/no-extraneous-dependencies */
import Note from '@toptal/picasso-note'
import NoteContent from '@toptal/picasso-note-content'
import NoteSubtitle from '@toptal/picasso-note-subtitle'
import NoteTitle from '@toptal/picasso-note-title'

export const NoteCompound = Object.assign(Note, {
  Title: NoteTitle,
  Subtitle: NoteSubtitle,
  Content: NoteContent,
})
