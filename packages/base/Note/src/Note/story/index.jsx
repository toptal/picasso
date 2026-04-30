import PicassoBook from '~/.storybook/components/PicassoBook'
import noteTitleStory from '../../NoteTitle/story'
import noteSubtitleStory from '../../NoteSubtitle/story'
import noteContentStory from '../../NoteContent/story'
import { Note } from '../Note'

const page = PicassoBook.section('Components').createPage(
  'Note',
  `

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Note, name: 'Note' })
  .addComponentDocs(noteTitleStory.componentDocs)
  .addComponentDocs(noteSubtitleStory.componentDocs)
  .addComponentDocs(noteContentStory.componentDocs)

page
  .createChapter()
  .addExample('Note/story/Default.example.tsx', 'Default', 'base/Note')
