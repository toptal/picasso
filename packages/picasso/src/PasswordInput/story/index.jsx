import { PasswordInput } from '../PasswordInput'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'PasswordInput',
  'Input component for passwords'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PasswordInput, name: 'PasswordInput' })

page
  .createChapter()
  .addExample('PasswordInput/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false
  })
  .addExample('PasswordInput/story/Disabled.example.tsx', {
    title: 'Disabled',
    takeScreenshot: false
  })
  .addExample('PasswordInput/story/Status.example.tsx', {
    title: 'Status',
    takeScreenshot: false
  })
