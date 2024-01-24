import { Logo } from '../Logo'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Logo',
  `
    The Toptal logo is the visual representation of the products we create.
    It was designed to be instantly recognizable to our users, partners and
    internal teams. Or goal is to ensure each logo instance contributes to our
    brand. This requires consistency in placement, scale, color and location.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Logo, name: 'Logo' })

page
  .createChapter()
  .addExample('Logo/story/Default.example.tsx', 'Default', 'base/Logo')
  .addExample('Logo/story/Emblem.example.tsx', 'Emblem', 'base/Logo')
  .addExample('Logo/story/Variants.example.tsx', 'Variants', 'base/Logo')
