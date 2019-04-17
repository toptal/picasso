import PicassoBook from '.storybook/components/PicassoBook'

import { Logo } from '../Logo'

const page = PicassoBook.createPage(
  'Logo',
  `
  The Toptal logo is the visual representation of the products we create.
  It was designed to be instantly recognizable to our users, partners and
  internal teams. Or goal is to ensure each logo instance contributes to our
  brand. This requires consistency in placement, scale, color and location.
`
)

page
  .addComponentDocs(Logo)
  .addExample('Logo/story/Default.example.jsx', 'Default')
  .addExample('Logo/story/Emblem.example.jsx', 'Emblem')
  .addExample('Logo/story/Variants.example.jsx', 'Variants')
