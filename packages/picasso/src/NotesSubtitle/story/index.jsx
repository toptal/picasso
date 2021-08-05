import PicassoBook from '~/.storybook/components/PicassoBook'

import { NotesSubtitle } from '../NotesSubtitle'

const page = PicassoBook
  .section('Components')
  .createPage(
    'NotesSubtitle',
    `<-- description -->`
  )

page
  .createTabChapter('Props')
  .addComponentDocs({ component: NotesSubtitle, name: 'NotesSubtitle' })

page
  .createChapter()
