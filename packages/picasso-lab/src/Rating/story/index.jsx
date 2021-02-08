import Rating from '../Rating'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage('Rating', null)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Rating, name: 'Rating' })

page
  .createChapter()
  .addExample('Rating/story/Default.example.tsx', {
    title: 'Default',
    description: 'Default behavior'
  })
  .addExample('Rating/story/CustomIcons.example.tsx', {
    title: 'Custom Icon',
    description:
      'The icons are fully customizable. You can provide a custom icon to render or add a tooltip to the default one.'
  })
  .addExample('Rating/story/NonInteractive.example.tsx', {
    title: 'Non Interactive',
    description:
      'The rating can be used in non-interactive mode. This mode prohibits changing its value.'
  })
