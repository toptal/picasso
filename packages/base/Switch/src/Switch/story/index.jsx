import { Switch } from '../Switch'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Switch',
  `
    Switches are used to toggle the state of an element on or off.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Switch, name: 'Switch' })

page
  .createChapter()
  .addExample(
    'Switch/story/Uncontrolled.example.tsx',
    {
      title: 'Uncontrolled',
      description: 'Can control its state by itself',
    },
    'base/Switch'
  )
  .addExample(
    'Switch/story/Controlled.example.tsx',
    {
      title: 'Controlled',
      description: 'Stateless Switch, state should be controlled using prop',
    },
    'base/Switch'
  )
  .addExample('Switch/story/Disabled.example.tsx', 'Disabled', 'base/Switch')
