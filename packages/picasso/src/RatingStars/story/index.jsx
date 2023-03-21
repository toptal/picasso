import ratingThumbsStory from '../../RatingThumbs/story'
import RatingStars from '../RatingStars'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Rating',
  `
    Ratings provide a way for users to express their opinion
    and experience about features or services.

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/39a488dc-44bc-4b37-b3c8-d14ca483b7b8?collectionLayerId=7df019cf-ec27-4ce9-af5b-76b5921644d5&mode=build'
    )}

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: RatingStars, name: 'Rating.Stars' })
  .addComponentDocs(ratingThumbsStory.componentDocs)

page
  .createChapter()
  .addExample('RatingStars/story/Default.example.tsx', {
    title: 'Default',
    description: 'Default behavior',
  })
  .addExample('RatingStars/story/NonInteractive.example.tsx', {
    title: 'Non Interactive',
    description:
      'The rating can be used in non-interactive mode. This mode prohibits changing its value.',
  })
  .addExample('RatingStars/story/Sizes.example.tsx', {
    title: 'Sizes example',
    description:
      'The rating component has two sizes - small (default) and large. It can be set via size parameter.',
  })
  .addExample('RatingStars/story/CustomIcons.example.tsx', {
    title: 'Custom Icon',
    description:
      'The icons are fully customizable. You can provide a custom icon to render or add a tooltip to the default one.',
    takeScreenshot: false,
  })
