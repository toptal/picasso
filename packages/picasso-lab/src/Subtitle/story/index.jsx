import { Subtitle } from '../Subtitle'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('Subtitle', null)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Subtitle, name: 'Subtitle' })

page
  .createChapter()
  .addExample('Subtitle/story/Default.example.tsx', 'Default')
  .addExample('Subtitle/story/Margin.example.tsx', 'With Top Margin')
  .addExample('Subtitle/story/Description.example.tsx', 'With Description')
  .addExample(
    'Subtitle/story/ActionAndDescription.example.tsx',
    'With Action and Description'
  )
