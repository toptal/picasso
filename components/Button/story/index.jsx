import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Button } from '../Button'

const page = PicassoBook.createPage(
  'Button',
  'A Button indicates a possible user action'
)

page
  .addComponentDocs(Button, {
    icon: {
      type: 'ReactElement'
    }
  })
  .addExample('Button/story/Basic.example.jsx', 'Basic')
  .addExample('Button/story/Variants.example.jsx', 'Variants')
  .addExample('Button/story/States.example.jsx', 'States')
  .addExample('Button/story/Disabled.example.jsx', {
    title: 'Disabled',
    description: 'The button shows that currently unable to be interacted with'
  })
  .addExample('Button/story/Sizes.example.jsx', 'Sizes')
  .addExample('Button/story/FullWidth.example.jsx', 'Full width')
  .addExample('Button/story/IconButtons.example.jsx', 'Button with Icon')
  .addExample(
    'Button/story/IconButtonsWithText.example.jsx',
    'Button with text and Icon'
  )
  .addExample('Button/story/Loading.example.jsx', 'Button with loading state')
