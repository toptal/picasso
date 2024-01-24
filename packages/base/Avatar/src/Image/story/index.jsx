import { Image } from '../Image'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Image',
  `Display any types of images.
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Image, name: 'Image' })

page
  .createChapter()
  .addExample('Image/story/Default.example.tsx', 'Default', 'base/Avatar')
  .addExample('Image/story/Variants.example.tsx', 'Variants', 'base/Avatar')
