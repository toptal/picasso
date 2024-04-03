import { Note } from '../Note'
import { NoteContent } from '../NoteContent'
import { NoteSubtitle } from '../NoteSubtitle'
import { NoteTitle } from '../NoteTitle'

type NoteCompoundType = typeof Note & {
  Title: typeof NoteTitle
  Subtitle: typeof NoteSubtitle
  Content: typeof NoteContent
}

export const NoteCompound: NoteCompoundType = Object.assign(Note, {
  Title: NoteTitle,
  Subtitle: NoteSubtitle,
  Content: NoteContent,
})
