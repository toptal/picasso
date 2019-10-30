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
  .addExample('Modal/story/Default.example.jsx', {
    title: 'Default',
    description: `
To show the 'Modal' component you should use 'useModals' hook. And if you need
any additional logic inside the 'Modal' component you should create a wrapper 
component and manage the internal state there.
`,
    sideeffectFn: () => {
      // eslint-disable-next-line no-console
      console.log('###############')
    },
    sideeffect: '2'
  })
  .addExample('Modal/story/Sizes.example.jsx', 'Sizes') // picasso-skip-visuals
  .addExample('Modal/story/MaxHeight.example.jsx', {
    title: 'Max Height'
  }) // picasso-skip-visuals
