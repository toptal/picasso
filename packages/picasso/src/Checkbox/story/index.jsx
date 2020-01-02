import { Checkbox } from '../Checkbox'
import checkboxGroupStory from '../../CheckboxGroup/story'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Checkbox', null, 'Forms')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Checkbox, name: 'Checkbox' })
  .addComponentDocs(checkboxGroupStory.componentDocs)

page
  .createChapter()
  .addExample('Checkbox/story/Uncontrolled.example.jsx', {
    title: 'Uncontrolled',
    description: 'Can control its state by itself'
  })
  .addExample('Checkbox/story/Controlled.example.jsx', {
    title: 'Controlled',
    description: 'Stateless checkbox, state should be controlled using prop'
  })
  .addExample(
    'Checkbox/story/CheckboxGroupVertical.example.jsx',
    'Checkbox group vertical'
  )
  .addExample(
    'Checkbox/story/CheckboxGroupHorizontal.example.jsx',
    'Checkbox group horizontal'
  )
  .addExample('Checkbox/story/Disabled.example.jsx', 'Disabled')
  .addExample('Checkbox/story/Indeterminate.example.jsx', 'Indeterminate')
  .addExample('Checkbox/story/Required.example.jsx', 'Required')
  .addExample('Checkbox/story/CustomLabel.example.tsx', 'Custom label')
