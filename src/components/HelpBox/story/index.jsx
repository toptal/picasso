import PicassoBook from '~/.storybook/components/PicassoBook'

import { HelpBox } from '../HelpBox'

const page = PicassoBook.createPage('HelpBox', `<-- description -->`)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: HelpBox, name: 'HelpBox' })

page.createChapter().addExample('HelpBox/story/Default.example.jsx', 'Default')
