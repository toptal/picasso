import Rating from '../Rating'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('Rating', null)

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
      'You can also provide a function to render a custom icon or customize the existing one with for example a tooltip'
  })
  .addExample('Rating/story/ReadOnly.example.tsx', {
    title: 'ReadOnly',
    description:
      'You can also make the rating component readonly in case you only need to display information and not let the user change it'
  })
