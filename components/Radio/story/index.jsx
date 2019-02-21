import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Radio',
  `Radio buttons are best used when users need to select a single option from a set of unfamiliar choices. 
  Radio buttons surface all the options and allow the user to compare choices before making a selection.`
)

page.addExample('Radio/story/Default.example.jsx', 'Default')
page.addExample('Radio/story/Types.example.jsx', 'Types')
page.addExample('Radio/story/Disabled.example.jsx', 'Disabled')
page.addExample(
  'Radio/story/RadioGroupVertical.example.jsx',
  'Radio group vertical'
)
page.addExample(
  'Radio/story/RadioGroupHorizontal.example.jsx',
  'Radio group horizontal'
)
