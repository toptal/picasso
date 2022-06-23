import PicassoLight from '../PicassoLight'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'PicassoLight',
  `
      The light version of the wrapper and the root component.
      &nbsp;
      &nbsp;

      All the rest of the components from Picasso library
      should be used only as nested in Picasso component.
      The preferred way to do that - to wrap your app within
      the <Picasso> component.

      This is a light composable version of <Picasso> component.
      You can add necessary functionality by wrapping the following
      utility components/providers:

      - <FixViewport /> - the same as passing a 'fixViewport' prop to <Picasso>
      - <Favicon /> - the same as passing a 'loadFavicon' prop to <Picasso>
      - <FontsLoader /> - the same as passing a 'loadFonts' prop to <Picasso>
      - <NotificationsProvider>{children}</NotificationsProvider> - enables notifications in the wrapped app
    `
)

page.createTabChapter('Props').addComponentDocs({
  component: PicassoLight,
  name: 'Picasso',
  additionalDocs: {
    RootComponent: {
      defaultValue: 'PicassoRootNode',
    },
  },
})

page
  .createChapter()
  .addExample('Picasso/PicassoLight/story/BarePicasso.example.tsx', {
    title: 'Picasso without any utilities',
    takeScreenshot: false,
  })
  .addExample(
    'Picasso/PicassoLight/story/WithFixViewportAndFontsLoader.example.tsx',
    {
      title: 'Picasso with FixViewport and FontsLoader',
      takeScreenshot: false,
    }
  )
  .addExample(
    'Picasso/PicassoLight/story/WithNotificationsAndFavicon.example.tsx',
    {
      title: 'Picasso with notifications and favicon',
      takeScreenshot: false,
    }
  )
