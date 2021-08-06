import PicassoBook from '~/.storybook/components/PicassoBook'
import notesTitleStory from '../../NotesTitle/story'
import notesSubtitleStory from '../../NotesSubtitle/story'
import notesContentStory from '../../NotesContent/story'
import { Notes } from '../Notes'

const page = PicassoBook.section('Components').createPage(
  'Notes',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://app.abstract.com/projects/1b06c884-06af-482a-bf12-a82f521a19a1/branches/master/commits/cd38a6cc5bf8f8b535b142fb9a2c9578c641dd82/files/96635516-c961-460f-988e-7ca2f565a7ec/layers/3B863FAB-C94C-4EE2-8061-FBFAB45778AE?mode=design&present=true&selected=root-699B47BF-FAEA-4D18-8474-A2EB3EA863B2'
  )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Notes, name: 'Notes' })
  .addComponentDocs(notesTitleStory.componentDocs)
  .addComponentDocs(notesSubtitleStory.componentDocs)
  .addComponentDocs(notesContentStory.componentDocs)

page.createChapter().addExample('Notes/story/Default.example.tsx', 'Default')
