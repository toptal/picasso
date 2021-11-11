import Rating from '../Rating'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Rating',
  `
    Ratings provide a way for users to express their opinion
    and experience about features or services.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/39a488dc-44bc-4b37-b3c8-d14ca483b7b8?collectionLayerId=7df019cf-ec27-4ce9-af5b-76b5921644d5&mode=build'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Rating, name: 'Rating' })

page
  .createChapter()
  .addExample('Rating/story/Default.example.tsx', {
    title: 'Default',
    description: 'Default behavior'
  }) // picasso-skip-visuals
  .addExample('Rating/story/CustomIcons.example.tsx', {
    title: 'Custom Icon',
    description:
      'The icons are fully customizable. You can provide a custom icon to render or add a tooltip to the default one.'
  }) // picasso-skip-visuals
  .addExample('Rating/story/NonInteractive.example.tsx', {
    title: 'Non Interactive',
    description:
      'The rating can be used in non-interactive mode. This mode prohibits changing its value.'
  }) // picasso-skip-visuals
  .addExample('Rating/story/Sizes.example.tsx', {
    title: 'Sizes example',
    description:
      'The rating component has two sizes - small (default) and large. It can be set via size parameter.'
  }) // picasso-skip-visuals
