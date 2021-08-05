import PicassoBook from '~/.storybook/components/PicassoBook'

import { NotesContent } from '../NotesContent'

const page = PicassoBook
  .section('Components')
  .createPage(
    'NotesContent',
    `<-- description -->`
  )

page
  .createTabChapter('Props')
  .addComponentDocs({ component: NotesContent, name: 'NotesContent' })

page
  .createChapter()
