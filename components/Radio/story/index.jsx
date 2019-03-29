import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Radio } from '../Radio'

const page = PicassoBook.createPage(
  'Radio',
  `Radio buttons are best used when users need to select a single option from a set of unfamiliar choices. 
  Radio buttons surface all the options and allow the user to compare choices before making a selection.`
)

page
  .addComponentDocs(Radio, {
    onChange: {
      type: {
        description:
          '(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void'
      }
    }
  })
  .addExample('Radio/story/Default.example.jsx', 'Default')
  .addExample('Radio/story/Disabled.example.jsx', 'Disabled')
  .addExample(
    'Radio/story/RadioGroupVertical.example.jsx',
    'Radio group vertical'
  )
  .addExample(
    'Radio/story/RadioGroupHorizontal.example.jsx',
    'Radio group horizontal'
  )
