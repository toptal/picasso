import { Modal } from '../Modal'
import modalActionsStory from '../../ModalActions/story'
import modalContentStory from '../../ModalContent/story'
import modalTitleStory from '../../ModalTitle/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Overlays').createPage(
  'Modal',
  `
    A modal displays content that temporarily blocks interactions with the main view of a site.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/d2ef8ff4-c842-4f2b-9ea7-78bfad1f21cb?collectionLayerId=4e8db29f-a5ad-4849-8803-296882ed62bc&mode=design&present=true'
    )}

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Modal, name: 'Modal' })
  .addComponentDocs(modalTitleStory.componentDocs)
  .addComponentDocs(modalContentStory.componentDocs)
  .addComponentDocs(modalActionsStory.componentDocs)

page
  .createChapter()
  .addExample('Modal/story/Default.example.tsx', {
    title: 'Default',
    description: `
To show the 'Modal' component you should use 'useModal' hook. And if you need
any additional logic inside the 'Modal' component you should create a wrapper 
component and manage the internal state there.
`,
    takeScreenshot: false,
  })
  .addExample('Modal/story/Sizes.example.tsx', {
    title: 'Sizes',
    takeScreenshot: false,
  })
  .addExample('Modal/story/MaxHeight.example.tsx', {
    title: 'Max Height',
    takeScreenshot: false,
  })
  .addExample('Modal/story/Tooltips.example.tsx', {
    title: 'Two tooltips on the page',
    takeScreenshot: false,
  })
  .addExample('Modal/story/Alignment.example.tsx', {
    title: 'Alignment',
    description: 'Demonstrate how `align` prop works',
    takeScreenshot: false,
  })
  .addExample('Modal/story/DisableBackdropClick.example.tsx', {
    title: 'Disable backdrop click',
    description:
      'Demonstrate how `disableBackdropClick` prop can be used to avoid closing modal on backdrop click',
    takeScreenshot: false,
  })
  .addExample('Modal/story/DynamicContent.example.tsx', {
    title: 'Dynamic Content',
    takeScreenshot: false,
  })
