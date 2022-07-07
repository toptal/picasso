import Picasso from '../Picasso'
import PicassoBook from '~/.storybook/components/PicassoBook'
import PicassoLight from '../PicassoLight'

const page = PicassoBook.section('Components').createPage(
  'Picasso',
  `
      The wrapper and the root component.
      &nbsp;  
      &nbsp;  

      All the rest of the components from Picasso library
      should be used only as nested in Picasso component.
      The preferred way to do that - to wrap your app within
      the <Picasso> component.
    `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Picasso,
    name: 'Picasso',
    additionalDocs: {
      RootComponent: {
        defaultValue: 'PicassoRootNode',
      },
    },
  })
  .addComponentDocs({
    component: PicassoLight,
    name: 'PicassoLight',
    description: `\
The light version of the wrapper and the root component.

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
    `,
    additionalDocs: {
      RootComponent: {
        defaultValue: 'PicassoRootNode',
      },
    },
  })

page
  .createChapter()
  .addExample('Picasso/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('Picasso/story/DisableResponsiveUI.example.tsx', {
    title: 'Responsive Disabled',
    takeScreenshot: false,
  })
  .addExample('Picasso/story/DisableClassNamePrefix.example.tsx', {
    title: 'ClassNames Prefix Disabled',
    takeScreenshot: false,
  })
  .addExample('Picasso/story/BarePicassoLight.example.tsx', {
    title: 'PicassoLight without any utilities',
    takeScreenshot: false,
  })
  .addExample('Picasso/story/LightWithFixViewportAndFontsLoader.example.tsx', {
    title: 'PicassoLight with FixViewport and FontsLoader',
    takeScreenshot: false,
  })
  .addExample('Picasso/story/LightWithNotificationsAndFavicon.example.tsx', {
    title: 'PicassoLight with notifications and favicon',
    takeScreenshot: false,
  })
