import PicassoBook from '~/.storybook/components/PicassoBook'

import { Modal } from '../Modal'

import modalActionsStory from '@components/ModalActions/story'
import modalContentStory from '@components/ModalContent/story'
import modalTitleStory from '@components/ModalTitle/story'

const page = PicassoBook.createPage(
  'Modal',
  'A modal displays content that temporarily blocks interactions with the main view of a site.',
  'Overlays'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Modal, name: 'Modal' })
  .addComponentDocs(modalTitleStory.componentDocs)
  .addComponentDocs(modalContentStory.componentDocs)
  .addComponentDocs(modalActionsStory.componentDocs)

page
  .createChapter()
  .addExample('Modal/story/Default.example.jsx', 'Default')
  .addExample('Modal/story/useModal.example.jsx', 'useModal')
