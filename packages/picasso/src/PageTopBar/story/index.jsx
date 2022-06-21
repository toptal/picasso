import { PageTopBar } from '../PageTopBar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageTopBar, 'Page.TopBar')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.TopBar', 'A PageTopBar component')
    .addExample('PageTopBar/story/Default.example.tsx', 'Default')
    .addExample('PageTopBar/story/Variants.example.tsx', 'Variants')
    .addExample('PageTopBar/story/LeftContent.example.tsx', 'Left content')
    .addExample('PageTopBar/story/RightContent.example.tsx', 'Right content')
    .addExample(
      'PageTopBar/story/ExtraMenuContent.example.tsx',
      'Extra header menu content'
    )
    .addExample('PageTopBar/story/Link.example.tsx', 'With link')
    .addExample('PageTopBar/story/WithoutTitle.example.tsx', 'Without title')
    .addExample('PageTopBar/story/Logo.example.tsx', 'With custom logo')
)

export default {
  componentDocs,
  chapter,
}
