import Note from '../Note'
import NoteContent from '../NoteContent'
import NoteSubtitle from '../NoteSubtitle'
import NoteTitle from '../NoteTitle'

export const NoteCompound = Object.assign(Note, {
  Title: NoteTitle,
  Subtitle: NoteSubtitle,
  Content: NoteContent,
})
