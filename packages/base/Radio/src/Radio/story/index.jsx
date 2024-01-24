import radioGroupStory from '../../RadioGroup/story'
import { Radio } from '../Radio'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Radio',
  `Radio buttons are best used when users need to select a single option from a set of unfamiliar choices. 
    Radio buttons surface all the options and allow the user to compare choices before making a selection.
    
  ${PicassoBook.createSourceLink(__filename)}
    `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Radio,
    name: 'Radio',
    additionalDocs: {
      onChange: {
        type: {
          description:
            '(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void',
        },
      },
    },
  })
  .addComponentDocs(radioGroupStory.componentDocs)

page
  .createChapter()
  .addExample(
    'Radio/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/Radio'
  )
  .addExample('Radio/story/Checked.example.tsx', 'Checked', 'base/Radio')
  .addExample('Radio/story/Disabled.example.tsx', 'Disabled', 'base/Radio')
  .addExample(
    'Radio/story/RadioGroupVertical.example.tsx',
    'Radio group vertical',
    'base/Radio'
  )
  .addExample(
    'Radio/story/RadioGroupHorizontal.example.tsx',
    'Radio group horizontal',
    'base/Radio'
  )
  .addExample(
    'Radio/story/RadioGroupGrid.example.tsx',
    'Radio group grid',
    'base/Radio'
  )
  .addExample(
    'Radio/story/CustomLabel.example.tsx',
    'Custom label',
    'base/Radio'
  )
