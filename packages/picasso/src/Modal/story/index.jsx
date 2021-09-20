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
`
  }) // picasso-skip-visuals
  .addExample('Modal/story/Sizes.example.tsx', {
    title: 'Sizes'
  }) // picasso-skip-visuals
  .addExample('Modal/story/MaxHeight.example.tsx', {
    title: 'Max Height'
  }) // picasso-skip-visuals
  .addExample('Modal/story/Tooltips.example.tsx', {
    // TODO title should be 1-2 words, title -> descripion
    title: 'Two tooltips on the page'
  }) // picasso-skip-visuals
  .addExample('Modal/story/Alignment.example.tsx', {
    title: 'Alignment',
    description: 'Demonstrate how `align` prop works'
  }) // picasso-skip-visuals
