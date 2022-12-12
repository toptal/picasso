import { PageTopBar } from '../PageTopBar'
import topBarMenuStory from '../../TopBarMenu/story'
import topBarItemStory from '../../TopBarItem/story'
import pageTopBarMenuStory from '../../PageTopBarMenu/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'PageTopBar',
  `A PageTopBar component
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PageTopBar, name: 'PageTopBar' })
  .addComponentDocs(topBarMenuStory.componentDocs)
  .addComponentDocs(topBarItemStory.componentDocs)
  .addComponentDocs(pageTopBarMenuStory.componentDocs)

page
  .createChapter()
  .addExample('PageTopBar/story/Default.example.tsx', 'Default')
  .addExample('PageTopBar/story/Variants.example.tsx', 'Variants')
  .addExample('PageTopBar/story/LeftContent.example.tsx', 'Left content')
  .addExample('PageTopBar/story/RightContent.example.tsx', 'Right content')
  .addExample('PageTopBar/story/CenterContent.example.tsx', 'Center content')
  .addExample(
    'PageTopBar/story/ExtraMenuContent.example.tsx',
    'Extra header menu content'
  )
  .addExample('PageTopBar/story/Link.example.tsx', 'With link')
  .addExample('PageTopBar/story/WithoutTitle.example.tsx', 'Without title')
  .addExample('PageTopBar/story/Logo.example.tsx', 'With custom logo')

page.connect(topBarMenuStory.chapter)
