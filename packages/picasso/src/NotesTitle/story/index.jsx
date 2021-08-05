import PicassoBook from '~/.storybook/components/PicassoBook'

import { NotesTitle } from '../NotesTitle'

const page = PicassoBook
  .section('Components')
  .createPage(
    'NotesTitle',
    `<-- description -->`
  )

page
  .createTabChapter('Props')
  .addComponentDocs({ component: NotesTitle, name: 'NotesTitle' })

page
  .createChapter()
