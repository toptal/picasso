import PicassoBook from '.storybook/components/PicassoBook'

import { Page } from '../Page'

const page = PicassoBook.createPage('Page', `A Page component`)

page
  .addComponentDocs(Page)
  .addExample('Page/story/Default.example.jsx', {
    title: 'Default',
    description:
      'Page has centered content and restricted width of 1200px or 75rem'
  })
  .addExample('Page/story/FullWidth.example.jsx', 'Full width')
  .addExample('Page/story/Scroll.example.jsx', 'Scroll with overflow')
