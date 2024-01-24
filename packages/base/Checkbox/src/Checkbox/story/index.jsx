import { Checkbox } from '../Checkbox'
import checkboxGroupStory from '../../CheckboxGroup/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Checkbox',
  `${PicassoBook.createSourceLink(__filename)}`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Checkbox, name: 'Checkbox' })
  .addComponentDocs(checkboxGroupStory.componentDocs)

page
  .createChapter()
  .addExample(
    'Checkbox/story/Uncontrolled.example.tsx',
    {
      title: 'Uncontrolled',
      description: 'Can control its state by itself',
    },
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/Controlled.example.tsx',
    {
      title: 'Controlled',
      description: 'Stateless checkbox, state should be controlled using prop',
    },
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/CheckboxGroupVertical.example.tsx',
    'Checkbox group vertical',
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/CheckboxGroupHorizontal.example.tsx',
    'Checkbox group horizontal',
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/CheckboxGroupGrid.example.tsx',
    'Checkbox group grid',
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/Disabled.example.tsx',
    'Disabled',
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/Indeterminate.example.tsx',
    {
      title: 'Indeterminate',
    },
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/Required.example.tsx',
    'Required',
    'base/Checkbox'
  )
  .addExample(
    'Checkbox/story/CustomLabel.example.tsx',
    'Custom label',
    'base/Checkbox'
  )
