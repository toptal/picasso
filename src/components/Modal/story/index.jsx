import PicassoBook from '~/.storybook/components/PicassoBook'

import { Modal } from '../Modal'

const page = PicassoBook.createPage(
  'Modal',
  'A modal displays content that temporarily blocks interactions with the main view of a site.',
  'Overlays'
)

page
  .addComponentDocs(Modal)
  .addExample('Modal/story/Default.example.jsx', 'Default')
