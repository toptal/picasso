import PicassoBook from '~/.storybook/components/PicassoBook'
import typographyLoaderStory from '../../TypographyLoader/story'
import headerLoaderStory from '../../HeaderLoader/story'
import buttonLoaderStory from '../../ButtonLoader/story'

const page = PicassoBook.section('Lab').createPage('SkeletonLoader')

page
  .createTabChapter('Props')
  .addComponentDocs(typographyLoaderStory.componentDocs)
  .addComponentDocs(headerLoaderStory.componentDocs)
  .addComponentDocs(buttonLoaderStory.componentDocs)

page.createChapter().addExample('SkeletonLoader/story/Default.example.tsx', {
  title: 'Page Loader',
  description: `
    SkeletonLoader is a compound component that exposes a few primitive content loaders.
    It's up to the developer to use them to build a loader that mimics the actual UI as close as possible.
    Below is a simple example demonstrating how. If you make a reusable skeleton loader - export it to topkit. 
    `,
  waitUntilImagesLoaded: true
}) // picasso-skip-visuals

page.connect(headerLoaderStory.chapter)
page.connect(typographyLoaderStory.chapter)
page.connect(buttonLoaderStory.chapter)
