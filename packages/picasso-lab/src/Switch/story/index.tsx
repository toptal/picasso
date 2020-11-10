import { Switch } from '../Switch'
// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('Switch', null)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Switch, name: 'Switch' })

page
  .createChapter()
  .addExample('Switch/story/Uncontrolled.example.tsx', {
    title: 'Uncontrolled',
    description: 'Can control its state by itself'
  })
  .addExample('Switch/story/Controlled.example.tsx', {
    title: 'Controlled',
    description: 'Stateless Switch, state should be controlled using prop'
  })
  .addExample('Switch/story/Disabled.example.tsx', 'Disabled')
