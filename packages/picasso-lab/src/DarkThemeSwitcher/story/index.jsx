import { DarkThemeSwitcher } from '../DarkThemeSwitcher'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'DarkThemeSwitcher',
  'Renders a switcher to change theme type.'
)

page.createTabChapter('Props').addComponentDocs({
  component: DarkThemeSwitcher,
  name: 'DarkThemeSwitcher'
})

page
  .createChapter()
  .addExample('DarkThemeSwitcher/story/Variants.example.tsx', 'Variants')
